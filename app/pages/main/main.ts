import { Component, OnDestroy, OnInit } from '@angular/core';

import { ToastController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pairwise';

import { ControlUnit, RaceControl, Settings, Speech } from '../../providers';
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
  lowFuel: Observable<number>;

  private stateSubscription: Subscription;
  private fuelSubscription: Subscription;

  constructor(public cu: ControlUnit, public rc: RaceControl,
    private settings: Settings, private speech: Speech,
    private toast: ToastController) 
  {
    let start = cu.getStart();
    let state = cu.getState();
    let mode = cu.getMode();
    let fuel = cu.getFuel();
    this.startCount = start.map(value => {
      return value == 1 ? 5 : value > 1 && value < 7 ? value - 1 : 0;
    });
    this.startBlink = state.combineLatest(start, (state, value) => {
      return state !== 'connected' || value >= 8;
    });
    this.usePitlane = mode.map(value => {
      return (value & 0x03) != 0;  // TODO: 4 added for pitlane - ignore or insist?
    });
    this.lowFuel = fuel.map((values) => {
      let value = 0;
      for (let i = 0; i < 6; i++) {
        if (values[i] < 2) {
          value |= (1 << i);
        }
      }
      //console.log('Low fuel: ', value);
      return value;
    });
  }

  ngOnInit() {
    this.stateSubscription = this.cu.getState().debounceTime(100).distinctUntilChanged().subscribe(state => {
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
    this.fuelSubscription = this.lowFuel.pairwise().map(([previous, current]) => {
      return current & ~previous;
    }).combineLatest(this.settings.get('speech', {}), (mask, speech) => {
      return [speech, mask];
    }).filter(([speech, mask]) => {
      return mask != 0 && speech.enabled && speech.lowfuel;
    }).subscribe(([speech, mask]) => {
      for (let i = 0; i < 6; i++) {
        if (mask & (1 << i)) {
          this.speech.speak(speech.lowfuel, this.rc.drivers[i]);
        }
      }
    });
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
    this.fuelSubscription.unsubscribe();
  }

  presentToast(message: string, duration: number) {
    this.toast.create({
      message: message, duration: duration, showCloseButton: true
    }).present();
  }
}
