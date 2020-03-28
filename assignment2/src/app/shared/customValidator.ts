import { FormControl } from '@angular/forms';

export class CustomValidator {
  static onValidatorDateTime(control: FormControl): { [s: string]: boolean } {
    if (new Date(control.value) <= new Date(1900, 1, 1)) {
      return {dateTimeInvalid: true};
    } else {
      return null;
    }
  }
}
