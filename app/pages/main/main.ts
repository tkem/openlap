import { Component, OnDestroy, OnInit } from '@angular/core';

import { ToastController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { ControlUnit, RaceControl } from '../../providers';
import { ChequeredFlag, Leaderboard, Startlight } from '../../components';
import { TimePipe } from '../../pipes';

@Component({
  directives: [ChequeredFlag, Leaderboard, Startlight],
  pipes: [TimePipe],
  templateUrl: 'build/pages/main/main.html',
})
export class MainPage implements OnDestroy, OnInit {

  startCount: Observable<number>;
  startBlink: Observable<boolean>;
  usePitlane: Observable<boolean>;

  private subscription: any;

  constructor(public cu: ControlUnit, public rc: RaceControl, private toast: ToastController) {
    let start = cu.getStart();
    let state = cu.getState();
    let mode = cu.getMode();
    this.startCount = start.map(value => {
      return value == 1 ? 5 : value > 1 && value < 7 ? value - 1 : 0;
    });
    this.startBlink = state.combineLatest(start, (state, value) => {
      return state !== 'connected' || value >= 8;
    });
    this.usePitlane = mode.map(value => {
      return (value & 0x03) != 0;  // TODO: 4 added for pitlane - ignore or insist?
    });
  }

  ngOnInit() {
    this.subscription = this.cu.getState().debounceTime(100).distinctUntilChanged().subscribe(state => {
      switch (state) {
      case 'connected':
        this.presentToast('Connected to ' + this.cu.peripheral.name, 1000);
        break;
      case 'connecting':
        this.presentToast('Connecting to ' + this.cu.peripheral.name, 1000);
        break;
      case 'disconnected':
        this.presentToast('CU disconnected', 1000);
        break;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  presentToast(message: string, duration: number) {
    this.toast.create({
      message: message, duration: duration, showCloseButton: true
    }).present();
  }
}
