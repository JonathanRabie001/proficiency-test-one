import { FormGroup, AbstractControl } from "@angular/forms";

export function CompareIDandDOB(
  controlName: string,
  matchingControlName: string
) {  
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return null;
    }    
    let reverseDate = matchingControl.value.split('/');
    reverseDate = reverseDate.reverse().join('');  
      
    if (control.value.slice(0,6) !== reverseDate.slice(2,reverseDate.length)) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function ValidateID(control: AbstractControl) {
  let val = control.value;
  let nSum = 0, isSecond = false;

  if(val.length === 13) {
    let nDigits = val.length;

    for (let i = nDigits - 1; i >= 0; i--) {
      let d = parseInt(val.charAt(i));
      if (isSecond) {
        d = d * 2;
      }
      nSum += (Math.floor(d / 10) + d % 10);
      isSecond = !isSecond;
    }

    if (nSum % 10 === 0) {
      return null;
    } else {
      return { validId: true };
    }
  }

  return null;
}