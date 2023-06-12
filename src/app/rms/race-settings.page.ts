import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { IonInput, IonToggle, NavParams, ModalController } from '@ionic/angular';

import { RaceOptions } from '../app-settings';

function formatTime(milliseconds: number) {
  const h = Math.floor(milliseconds / 3600000);
  const m = Math.floor(milliseconds / 60000 % 60);
  const s = ("" + h).padStart(1, '0') + ':' + ("" + m).padStart(2, '0');
  //console.log(milliseconds, " => ", s);
  return s;
}

function parseTime(s: string) {
  const [h, m] = s.split(':');
  const time = (parseInt(h) * 3600 + parseInt(m) * 60) * 1000;
  //console.log(s, " => ", time);
  return time;
}

function timeRequired(control: AbstractControl): {[key: string]: any} {
  if (!control.value || !parseTime(control.value)) {
    return {'required': true};
  } else {
    return null;
  }
}

function lapsOrTimeRequired(group: UntypedFormGroup): {[key: string]: any} {
  const laps = parseInt(group.get('laps').value);
  if (laps && laps > 0) {
    return null;
  }
  if (!timeRequired(group.get('time'))) {
    return null;
  }
  return {'required': true};
}

function createQualifyingForm(fb: UntypedFormBuilder, params: NavParams) {
  return fb.group({
    time: new UntypedFormControl(formatTime(params.get('time') || 300000), timeRequired),
    pause: new UntypedFormControl({
      value: params.get('pause') || false,
      disabled: !params.get('time')
    }),
    drivers: new UntypedFormControl(params.get('drivers') || ''),
    auto: new UntypedFormControl(params.get('auto') || false),
    pace: new UntypedFormControl(params.get('pace') || false)
  });
}

function createRaceForm(fb: UntypedFormBuilder, params: NavParams) {
  return fb.group({
    laps: new UntypedFormControl(params.get('laps') || '0'),
    time: new UntypedFormControl(formatTime(params.get('time') || 0)),
    pause: new UntypedFormControl({
      value: !!params.get('pause'),
      disabled: !params.get('time')
    }),
    slotmode: new UntypedFormControl({
      value: !!params.get('slotmode'),
      disabled: !params.get('laps')
    }),
    drivers: new UntypedFormControl(params.get('drivers') || ''),
    auto: new UntypedFormControl(params.get('auto') || false),
    pace: new UntypedFormControl(params.get('pace') || false)
  }, {
    validator: lapsOrTimeRequired
  });
}

@Component({
  templateUrl: 'race-settings.page.html'
})
export class RaceSettingsPage implements AfterViewInit {

  mode: 'qualifying' | 'race';

  form: UntypedFormGroup;

  @ViewChild('time') timeInput: IonInput;

  @ViewChild('laps') lapsInput: IonInput;

  @ViewChild('pause', { static: true }) pauseToggle: IonToggle;

  @ViewChild('slotmode') slotmodeToggle: IonToggle;
  
  constructor(fb: UntypedFormBuilder, params: NavParams, private mod: ModalController) {
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

  onTimeInput(event) {
    const value = event.target!.value;
    // Remove non alphanumeric characters
    const filteredValue: string = value
    .replace(/[^0-9]+/g, '')
    .replace(/^0+/, '');
    const minutes = filteredValue
      .substring(filteredValue.length - 2)
      .padStart(2, '0');
    const hours = filteredValue
      .substring(0, filteredValue.length - 2)
      .padStart(1, '0');
    const finalValue = hours + ':' + minutes;
    this.timeInput.value = finalValue;
    this.form.get("time").setValue(finalValue);
  }

  onChangeTime(event) {
    const time = parseTime(event.detail.value);
    this.timeInput.value = formatTime(time);
    if (time != 0) {
      this.form.get('pause').enable();
    } else {
      this.form.get('pause').disable();
    }
    if (this.pauseToggle) {
      this.pauseToggle.disabled = this.form.get('pause').disabled;
    }
  }

  onLapsInput(event) {
    const value = event.target!.value;
    const filteredValue = value.replace(/[^0-9]+/g, '').replace(/^0+/, '') || "0";
    this.lapsInput.value = filteredValue;
    this.form.get("laps").setValue(filteredValue);
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

  onSubmit(options) {
    this.mod.dismiss(Object.assign(new RaceOptions(this.mode), {
      laps: parseInt(options.laps || '0'),
      time: parseTime(options.time || '0:00'),
      pause: options.pause,
      drivers: options.drivers ? parseInt(options.drivers) : undefined,
      auto: options.auto,
      pace: options.pace,
      slotmode: options.slotmode
    }));
  }

  onCancel() {
    this.mod.dismiss();
  }
}
