import { Component, OnDestroy, OnInit } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { Connectable, Subject, Subscription } from 'rxjs';

import { map, publish, tap } from 'rxjs/operators';

import { AppComponent } from '../app.component';
import { DataView } from '../carrera';
import { ControlUnitService, I18nAlertService, LoggingService } from '../services';

const FWU_START_COMMAND = DataView.fromString('GB2');
const FWU_FINALIZE_COMMAND = DataView.fromString('E0');
const VERSION_COMMAND = DataView.fromString('0');

const delay = ms => new Promise(res => setTimeout(res, ms));

@Component({
    templateUrl: 'firmware.page.html',
    standalone: false
})
export class FirmwarePage implements OnDestroy, OnInit {

  private connection: Subject<ArrayBuffer>;

  private subscription: Subscription;

  lines: Array<string>;  // TODO: use better file check indicator

  totalLines: number;

  status: 'init' | 'starting' | 'updating' | 'finishing' | 'done' = 'init';

  version: string;

  private requests = [];

  constructor(public cu: ControlUnitService, public logger: LoggingService, private alert: I18nAlertService, private app: AppComponent) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  get progress(): number {
    return this.totalLines ? (this.totalLines - this.lines.length) / this.totalLines : 0;
  }

  get busy(): boolean {
    return this.status === 'starting' || this.status === 'updating' || this.status === 'finishing';
  }

  private async parseFirmwareFile(file: File): Promise<string[]> {
    if (!file.name.toLowerCase().endsWith('.hmf')) {
      throw new Error(`Invalid firmware file name: ${file.name}`);
    }
    const text = await file.text();
    const lines = text.split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0);
    // So far, all known .HMF files have ~880 lines
    if (lines.length < 800) {
      throw new Error(`Short file with ${lines.length} line(s)`);
    }
    return lines.map(line => {
      const match = line.match(/^"([0-9a-fA-F]+)"$/);
      if (!match) {
        throw new Error(`Invalid line "${line}"`);
      }
      return match[1];
    });
  }

  async readFirmwareFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    try {
      this.lines = await this.parseFirmwareFile(file);
      this.totalLines = this.lines.length;
    } catch (error) {
      this.logger.error(`Error parsing firmware file "${file.name}":`, error);
      await this.alert.show({
        header: 'Invalid firmware file',
        message: 'The file seems to be invalid or corrupt.',
        buttons: ['OK']
      });
      input.value = '';
    }
  }

  async confirmFirmwareUpdate() {
    this.alert.show({
      header: 'Start firmware update',
      message: 'Do not disconnect or power off the Control Unit during the update!',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      }, {
        text: 'OK',
        handler: () => { this.startFirmwareUpdate(); }
      }]
    });
  }

  async startFirmwareUpdate() {
    const cu = this.cu.value;
    if (!cu) {
      this.logger.error('No control unit connected for firmware update');
      return;
    }

    const blockSize = cu.peripheral.fwuBlockSize;

    this.status = 'starting';

    try {
      await cu.disconnect();
      await delay(5000);
      this.connection = cu.peripheral.connect({
        next: () => {
          this.logger.info("Start firmware update");
          this.connection.next(FWU_START_COMMAND.buffer);
          this.status = 'updating';
        }
      });
      const data = this.connection.pipe(
        map((data: ArrayBuffer) => {
          const s = new TextDecoder().decode(new Uint8Array(data));
          this.logger.info("peripheral next:", s);
          return s;
        }),
        tap((value) => {
          // TODO: proper subscriber, not tap!
          this.poll(value, blockSize);
        }),
        publish()
      ) as Connectable<string>;
      this.subscription = data.connect();
    } catch (error) {
      this.logger.error('Error updating firmware', error);
      this.status = 'init';
    }
  }

  async poll(value: string, blockSize) {
    if (value.startsWith("0")) {
      this.version = value.substr(1, 4);
      this.status = 'done';
      if (this.app?.menu) {
        this.app.menu.reconnect();  // updates CU version in menu
      } else {
        this.cu.value.reconnect();
      }
      return;
    }
    if (value.startsWith("G")) {
      await delay(2000);
    }
    if (this.requests && this.requests.length) {
        const request = this.requests.shift();
        this.connection.next(request.buffer);
    } else if (this.lines && this.lines.length) {
      const data = this.lines.shift();
      if (!blockSize) {
        const request = DataView.fromHex('E', data);
        this.connection.next(request.buffer);
      } else {
        // Chunked mode: multiple "F" commands + final "E"
        for (let i = 0; i < data.length; i += blockSize) {
          const block = data.slice(i, Math.min(i + blockSize, data.length));
          const request = DataView.fromHex('F', block);
          //this.logger.debug("Prepare request", request);
          this.requests.push(request);
        }
        this.requests.push(FWU_FINALIZE_COMMAND);
        const request = this.requests.shift();
        this.connection.next(request.buffer);
      }
    } else {
      this.status = 'finishing';
      await delay(5000);
      this.connection.next(VERSION_COMMAND.buffer);
    }
  }

}

export const firmwareCanDeactivateGuard: CanDeactivateFn<FirmwarePage> = (page) => {
  if (page.busy) {
      page.logger.warn('Preventing user from leaving firmware page while update is in progress');
      return false;
  } else {
    return true;
  }
};
