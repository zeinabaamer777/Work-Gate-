import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';  
 
export class CustomValidationService {
 
      // let regularExp = /^[\u0621-\u064A\u0660-\u0669 ]+$/;  
      // const regularExp = new RegExp('^[\u0621-\u064A\u0660-\u0669 ]+$');

      // if(control.value !== undefined && !regularExp.test(control.value)){  
      //   return {"isValidInput": true};  
      // }  
      // return null;

  //#region 1 patternArabicValidator() method to valide only arabic characters
   patternArabicValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[\u0621-\u064A\u0660-\u0669 ]+$');
      const valid = regex.test(control.value);
      return valid ? null : { isValidInput: true };
    };
  }
  //#endregion

  //#region 2 patternEnglishValidator() method to valide only arabic characters
  patternEnglishValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[a-zA-Z ]*$');
      const valid = regex.test(control.value);
      return valid ? null : { isValidInput: true };
    };
  }
  //#endregion
 
}

// function validateUsername(c: string) : ValidationErrors {
//       return (this.isAvailable(c)=='Y') ? null : {
//         validateUsername: {
//           valid: false
//         }
//       };
//     }
 