import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { IonInput, IonToggle, ModalController } from '@ionic/angular';

import { RaceOptions } from '../app-settings';

function formatTime(milliseconds: number) {
  const h = Math.floor(milliseconds / 3600000);
  const m = Math.floor(milliseconds / 60000 % 60);
  const s = ("" + h).padStart(1, '0') + ':' + ("" + m).padStart(2, '0');
  return s;
}

function parseTime(s: string) {
  const [h, m] = s.split(':');
  const time = (parseInt(h) * 3600 + parseInt(m) * 60) * 1000;
  return time;
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

function createQualifyingForm(fb: FormBuilder, params: Record<string, any>) {
  return fb.group({
    time: new FormControl(formatTime(params['time'] || 300000), timeRequired),
    pause: new FormControl({
      value: params['pause'] || false,
      disabled: !params['time']
    }),
    stopfin: new FormControl(params['stopfin'] || false),
    drivers: new FormControl(params['drivers'] || ''),
    auto: new FormControl(params['auto'] || false),
    pace: new FormControl(params['pace'] || false)
  });
}

function createRaceForm(fb: FormBuilder, params: Record<string, any>) {
  return fb.group({
    laps: new FormControl(params['laps'] || '0'),
    time: new FormControl(formatTime(params['time'] || 0)),
    pause: new FormControl({
      value: !!params['pause'],
      disabled: !params['time']
    }),
    slotmode: new FormControl({
      value: !!params['slotmode'],
      disabled: !params['laps']
    }),
    stopfin: new FormControl(params['stopfin'] || false),
    drivers: new FormControl(params['drivers'] || ''),
    auto: new FormControl(params['auto'] || false),
    pace: new FormControl(params['pace'] || false)
  }, {
    validators: lapsOrTimeRequired
  } as AbstractControlOptions);
}

@Component({
    templateUrl: 'race-settings.component.html',
    standalone: false
})
export class RaceSettingsComponent implements AfterViewInit, OnInit {

  @Input() mode: 'qualifying' | 'race';
  @Input() laps: number;
  @Input() time: number;
  @Input() pause: boolean;
  @Input() slotmode: boolean;
  @Input() stopfin: boolean;
  @Input() drivers: number;
  @Input() auto: boolean;
  @Input() pace: boolean;

  form: FormGroup;

  @ViewChild('time') timeInput: IonInput;

  @ViewChild('laps') lapsInput: IonInput;

  @ViewChild('pause', { static: true }) pauseToggle: IonToggle;

  @ViewChild('slotmode') slotmodeToggle: IonToggle;
  
  constructor(private fb: FormBuilder, private mod: ModalController) {
  }

  ngOnInit() {
    if (this.mode == 'race') {
      this.form = createRaceForm(this.fb, this);
    } else {
      this.form = createQualifyingForm(this.fb, this);
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
    this.timeInput.getInputElement().then(e => e.blur());
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
    this.lapsInput.getInputElement().then(e => e.blur());
  }

  onSubmit(options) {
    this.mod.dismiss(Object.assign(new RaceOptions(this.mode), {
      laps: parseInt(options.laps || '0'),
      time: parseTime(options.time || '0:00'),
      pause: options.pause,
      drivers: options.drivers ? parseInt(options.drivers) : undefined,
      auto: options.auto,
      pace: options.pace,
      slotmode: options.slotmode,
      stopfin: options.stopfin
    }));
  }

  onCancel() {
    this.mod.dismiss();
  }
}
