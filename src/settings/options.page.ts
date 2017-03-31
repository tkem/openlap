import { Component, OnDestroy, OnInit } from '@angular/core';

import { Options, Settings } from '../core';

@Component({
  templateUrl: 'options.page.html'
})
export class OptionsPage implements OnDestroy, OnInit {

  options = new Options();

  private subscription: any;

  constructor(private settings: Settings) {}

  ngOnInit() {
    this.subscription = this.settings.getOptions().subscribe(options => {
      this.options = options;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  update() {
    this.settings.setOptions(this.options);
  }
}
