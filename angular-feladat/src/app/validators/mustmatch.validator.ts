import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the hero's alter ego */
export const mustMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const egy = control.get('password');
  const ketto = control.get('password2');

  return egy && ketto && egy.value != ketto.value ? { 'mustMatch': true } : null;
};

@Directive({
  selector: '[appMustMatch]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MustMatchValidatorDirective, multi: true }]
})
export class MustMatchValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return mustMatchValidator(control)
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/