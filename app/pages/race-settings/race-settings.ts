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

@Component({
  templateUrl: 'build/pages/race-settings/race-settings.html'
})
export class RaceSettingsPage {

  form: FormGroup;

  constructor(fb: FormBuilder, params: NavParams, private view: ViewController) {
    this.form = fb.group({
      laps: [params.get('laps') || 10],
      time: [params.get('time')],
      auto: [params.get('auto') || false],
      pace: [params.get('pace') || false]
    }, {
      validator: anyRequired('laps', 'time')
    });
  }

  onSubmit(options) {
    this.view.dismiss(options);
  }

  onCancel() {
    this.view.dismiss();
  }
}
