import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";

export class ValidacionesPropias {

    static formatoDNI(control: AbstractControl): ValidationErrors| null {
        let DNI = control.value;
        let patron=/^[0-9]{8}[A-Z]$/
        if (patron.test(DNI))
            return null;
        else
            return { formatoDNI: true }
    }
    static mas18(control: AbstractControl): ValidationErrors| null {
        let id = parseInt(control.value);
       
        if (id > 15 && id < 86)
        return null;
    else
        return { mas18: true }
}

}