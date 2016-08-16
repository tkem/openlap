import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavParams, ViewController } from 'ionic-angular';

// TODO: merge with race-settings!
@Component({
  templateUrl: 'build/pages/qualifying-settings/qualifying-settings.html'
})
export class QualifyingSettingsPage {

  form: FormGroup;

  constructor(fb: FormBuilder, params: NavParams, private view: ViewController) {
    this.form = fb.group({
      time: [params.get('time') || 3],
      auto: [params.get('auto') || false],
      pace: [params.get('pace') || false]
    });
  }

  onSubmit(options) {
    this.view.dismiss(options);
  }

  onCancel() {
    this.view.dismiss();
  }
}
