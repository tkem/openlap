import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavParams, ViewController } from 'ionic-angular';

function anyRequired(...names: string[]) {
  return (group: FormGroup): {[key: string]: any} => {
    for (let name of names) {
      if (!Validators.required(group.controls[name])) {
        return null;
      }
    }
    return {'required': true};
  }
}

function formatTime(milliseconds) {
  let s = Math.floor(milliseconds / 1000);
  let result = '';
  while (s) {
    const f = s % 60;
    result = f + result;
    s = Math.floor(s / 60);
    if (s) {
      if (f < 10) {
        result = '0' + result;
      }
      result = ':' + result;
    }
  }
  return result;
}

function parseTime(s) {
  return s.split(':').reduce((sum, cur) => sum * 60 + parseInt(cur), 0) * 1000;
}

const timeValidator = Validators.pattern('((([0-9]+\:)?[0-5])?[0-9]\:)?[0-5][0-9]');

function createQualifyingForm(fb: FormBuilder, params: NavParams) {
  return fb.group({
    time: [
      formatTime(params.get('time') || 180000), 
      [timeValidator, Validators.required]
    ],
    auto: [params.get('auto') || false],
    pace: [params.get('pace') || false]
  });
}

function createRaceForm(fb: FormBuilder, params: NavParams) {
  return fb.group({
    laps: [params.get('laps') || 10],
    time: [formatTime(params.get('time')), timeValidator],
    auto: [params.get('auto') || false],
    pace: [params.get('pace') || false],
    slotmode: [params.get('slotmode') || false]
  }, {
    validator: anyRequired('laps', 'time')
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
