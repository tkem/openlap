import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NavParams, ModalController } from '@ionic/angular';

import { RaceOptions } from '../app-settings';

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
  const laps = parseInt(group.get('laps').value);
  if (laps && laps > 0) {
    return null;
  }
  if (!timeRequired(group.get('time'))) {
    return null;
  }
  return {'required': true};
}

function createQualifyingForm(fb: FormBuilder, params: NavParams) {
  return fb.group({
    time: new FormControl(formatTime(params.get('time') || 180000), timeRequired),
    pause: new FormControl({
      value: params.get('pause') || false,
      disabled: !params.get('time')
    }),
    drivers: new FormControl(params.get('drivers') || ''),
    auto: new FormControl(params.get('auto') || false),
    pace: new FormControl(params.get('pace') || false)
  });
}

function createRaceForm(fb: FormBuilder, params: NavParams) {
  return fb.group({
    laps: new FormControl(params.get('laps') || '', Validators.pattern('\\d*')),
    time: new FormControl(formatTime(params.get('time') || 0)),
    pause: new FormControl({
      value: !!params.get('pause'),
      disabled: !params.get('time')
    }),
    slotmode: new FormControl({
      value: !!params.get('slotmode'),
      disabled: !params.get('laps')
    }),
    drivers: new FormControl(params.get('drivers') || ''),
    auto: new FormControl(params.get('auto') || false),
    pace: new FormControl(params.get('pace') || false)
  }, {
    validator: lapsOrTimeRequired
  });
}

@Component({
  templateUrl: 'race-settings.page.html'
})
export class RaceSettingsPage implements AfterViewInit {

  mode: 'qualifying' | 'race';

  form: FormGroup;

  @ViewChild('pause', { static: true }) pauseToggle;

  @ViewChild('slotmode', { static: false }) slotmodeToggle;

  constructor(fb: FormBuilder, params: NavParams, private modal: ModalController) {
    this.mode = params.get('mode');
    if (this.mode == 'race') {
      this.form = createRaceForm(fb, params);
    } else {
      this.form = createQualifyingForm(fb, params);
    }
  }

  ngAfterViewInit() {
    // see https://github.com/driftyco/ionic/issues/9041
    if (this.pauseToggle) {
      this.pauseToggle.disabled = this.form.get('pause').disabled;
    }
    if (this.slotmodeToggle) {
      this.slotmodeToggle.disabled = this.form.get('slotmode').disabled;
    }
  }

  onChangeLaps(event) {
    if (parseInt(event.detail.value || '0') > 0) {
      this.form.get('slotmode').enable();
    } else {
      this.form.get('slotmode').disable();
    }
    if (this.slotmodeToggle) {
      this.slotmodeToggle.disabled = this.form.get('slotmode').disabled;
    }
  }

  onChangeTime(event) {
    if (parseTime(event.detail.value) != 0) {
      this.form.get('pause').enable();
    } else {
      this.form.get('pause').disable();
    }
    if (this.pauseToggle) {
      this.pauseToggle.disabled = this.form.get('pause').disabled;
    }
  }

  onSubmit(options) {
    this.modal.dismiss(Object.assign(new RaceOptions(this.mode), {
      laps: parseInt(options.laps || '0'),
      time: parseTime(options.time || ''),
      pause: options.pause,
      drivers: options.drivers ? parseInt(options.drivers) : undefined,
      auto: options.auto,
      pace: options.pace,
      slotmode: options.slotmode
    }));
  }

  onCancel() {
    this.modal.dismiss();
  }
}
