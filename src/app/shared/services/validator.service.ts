import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public static firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public static emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public static spanishPhonePattern: string = '^[679][0-9]{8}$';
  public static onlyNumbersPattern: string = '^[1-9]\d*$';

  public hasAtLeastOneSelection = (control: AbstractControl): ValidationErrors | null => {

    
    const isValid: boolean = (control as FormArray).controls.some(control => control.value === true);
    
    return isValid ? null : { error: 'Selecciona mínim un servei'};

  }

}
