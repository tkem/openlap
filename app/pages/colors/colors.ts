import { Component, OnDestroy } from '@angular/core';

import { RaceControl, Storage } from '../../providers';

import { Cordova, Plugin } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/colors/colors.html'
})
export class ColorsPage implements OnDestroy {

  colors: any[];

  constructor(private rc: RaceControl, private storage: Storage) {
    console.log('RC Colors:', rc.colors);
    this.colors = rc.colors.map((color) => { return { value: color } });
    console.log('Colors:', this.colors);
  }
  
  ngOnDestroy() {
    this.rc.colors = this.colors.map((color) => color.value);
    this.storage.set('colors', this.rc.colors);
  }

  reorderItems(indexes) {
    let element = this.colors[indexes.from];
    this.colors.splice(indexes.from, 1);
    this.colors.splice(indexes.to, 0, element);
  }
}
