import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavParams, ViewController } from 'ionic-angular';

function required(...names: string[]) {
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
  templateUrl: 'build/pages/race/race.html'
})
export class RacePage {

  form: FormGroup;

  constructor(fb: FormBuilder, private params: NavParams, private view: ViewController) {
    this.form = fb.group({
      laps: [params.get('laps')],
      time: [params.get('time')],
      auto: [params.get('auto')],
      pace: [params.get('pace')]
    }, {
      validator: required('laps', 'time')
    });
  }

  onSubmit(options) {
    this.view.dismiss(options);
  }

  onCancel() {
    this.view.dismiss();
  }
}
