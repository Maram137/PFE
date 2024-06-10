import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isValidLength = value.length >= 8;

    const errors: ValidationErrors = {};

    if (!hasUpperCase) {
      errors['uppercase'] = 'Must contain uppercase';
    }

    if (!hasSymbol) {
      errors['symbol'] = ' And symbol';
    }

    if (!isValidLength) {
      errors['length'] = 'Password must be 8 characters or less';
    }

    return Object.keys(errors).length ? errors : null;
  };
}
