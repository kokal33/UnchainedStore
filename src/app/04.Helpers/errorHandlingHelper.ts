import { FormControl, FormGroup } from "@angular/forms";

export class ErrorHandlingsHelper {



  static getValidationMessage(formGroup: FormGroup, controlName: string) {
    const control = formGroup.get(controlName) as FormControl;
    if (control) {
      if (control.errors?.required) {
        return 'Field is required';
      }
      if (control.errors?.email) {
        return 'Email is invalid';
      }
      if (control.errors?.invalid) {
        return 'Invalid value';
      }
      if (control.errors?.maxlength) {
        return 'Max length exceeded';
      }
    }

    return null;
  }
}
