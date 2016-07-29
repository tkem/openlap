import { Component, OnDestroy, OnInit } from '@angular/core';

import { NavController, Toast } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { ControlUnit, RaceControl } from '../../providers';
import { Leaderboard, Startlight } from '../../components';
import { TimePipe } from '../../pipes';

@Component({
  directives: [Leaderboard, Startlight],
  pipes: [TimePipe],
  templateUrl: 'build/pages/main/main.html',
})
export class MainPage implements OnDestroy, OnInit {

  startCount: Observable<number>;
  startBlink: Observable<boolean>;
  usePitlane: Observable<boolean>;

  private stateSubscription: any;

  constructor(public cu: ControlUnit, public rc: RaceControl, private nav: NavController) {
    this.startCount = cu.start.map(value => {
      return value == 1 ? 5 : value > 1 && value < 7 ? value - 1 : 0;
    });
    this.startBlink = cu.state.combineLatest(cu.start, (state, value) => {
      return state !== 'connected' || value >= 8;
    });
    this.usePitlane = cu.mode.map(value => {
      return (value & 0x03) != 0;  // TODO: 4 added for pitlane - ignore or insist?
    });
  }

  ngOnInit() {
    this.stateSubscription = this.cu.state.debounceTime(100).distinctUntilChanged().subscribe(state => {
      switch (state) {
      case 'connected':
        this.toast('Connected to ' + this.cu.peripheral.name, 1000);
        break;
      case 'connecting':
        this.toast('Connecting to ' + this.cu.peripheral.name, 1000);
        break;
      case 'disconnected':
        this.toast('CU disconnected', 1000);
        break;
      }
    });
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

  toast(message: string, duration: number) {
    console.log('Creating toast', message)
    let toast = Toast.create({message: message/*, duration: duration*/});
    toast.onDismiss(() => { console.log('Toast dismissed', message); });
    setTimeout(() => {
      console.log('Dismissing toast', message);
      toast.dismiss();
    }, duration);
    this.nav.present(toast);
  }
}
