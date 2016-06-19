import { Component, Input, OnInit } from '@angular/core';

import { NavController, Toast } from 'ionic-angular';

import { ConnectionPage } from '../connection/connection';

import { ControlUnit, RaceControl } from '../../providers';

import { FuelGauge, Startlight, Stripe } from '../../components';
import { TimePipe } from '../../pipes';

@Component({
  directives: [FuelGauge, Startlight, Stripe],
  pipes: [TimePipe],
  templateUrl: 'build/pages/leaderboard/leaderboard.html',
})
export class LeaderboardPage implements OnInit {

  constructor(public cu: ControlUnit, public rc: RaceControl, private nav: NavController) {}

  ngOnInit() {
    this.cu.state.subscribe(state => {
      switch (state) {
        case 'connected':
          this.nav.present(Toast.create({message: 'Connected to ' + this.cu.device.name, duration: 2000}));
          break;
        case 'connecting':
          this.nav.present(Toast.create({message: 'Connecting to ' + this.cu.device.name, duration: 1000}));
          break;
        case 'disconnected':
          this.nav.push(ConnectionPage);
          break;
      }
    });
  }
}
