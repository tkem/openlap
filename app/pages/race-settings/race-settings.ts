import { Component } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavParams, ViewController } from 'ionic-angular';

function formatTime(milliseconds: number) {
  const h = Math.floor(milliseconds / 3600000);
  const m = Math.floor(milliseconds / 60000 % 60);
  const s = Math.floor(milliseconds / 1000 % 60);
  return [h, m, s].map(v => ('0' + v).substr(-2)).join(':');
}

function parseTime(s: string) {
  return s.split(':').reduce((sum, cur) => sum * 60 + parseInt(cur), 0) * 1000;
}

function timeRequired(control: AbstractControl): {[key: string]: any} {
  if (!control.value || !parseTime(control.value)) {
    return {'required': true};
  } else {
    return null;
  }
}

function lapsOrTimeRequired(group: FormGroup): {[key: string]: any} {
  if (parseInt(group.controls['laps'].value)) {
    return null;
  }
  if (!timeRequired(group.controls['time'])) {
    return null;
  }
  return {'required': true};
}

function createQualifyingForm(fb: FormBuilder, params: NavParams) {
  return fb.group({
    time: [formatTime(params.get('time') || 180000), timeRequired],
    auto: [params.get('auto') || false],
    pace: [params.get('pace') || false]
  });
}

function createRaceForm(fb: FormBuilder, params: NavParams) {
  return fb.group({
    laps: [params.get('laps') || 10, Validators.pattern('\\d*')],
    time: [formatTime(params.get('time'))],
    auto: [params.get('auto') || false],
    pace: [params.get('pace') || false],
    slotmode: [params.get('slotmode') || false]
  }, {
    validator: lapsOrTimeRequired
  });
}

@Component({
  templateUrl: 'build/pages/race-settings/race-settings.html'
})
export class RaceSettingsPage {

  mode: string;

  form: FormGroup;

  constructor(fb: FormBuilder, params: NavParams, private view: ViewController) {
    this.mode = params.get('mode');
    if (this.mode == 'race') {
      this.form = createRaceForm(fb, params);
    } else {
      this.form = createQualifyingForm(fb, params);
    }
  }

  onSubmit(options) {
    this.view.dismiss({
      mode: this.mode,
      laps: parseInt(options.laps || ''),
      time: parseTime(options.time || ''),
      auto: options.auto,
      pace: options.pace,
      slotmode: options.slotmode
    });
  }

  onCancel() {
    this.view.dismiss();
  }
}
