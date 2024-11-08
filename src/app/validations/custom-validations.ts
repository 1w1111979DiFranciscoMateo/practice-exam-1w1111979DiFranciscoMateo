import { AbstractControl, FormArray, ValidationErrors } from "@angular/forms";

//Este es un file para tener todas las validaciones custom del proyecto, asi 
//las puedo reutilizar en diferentes componentes

//Validacion que verifica que el length del arrayControl (el formArray) sea mayor a 1,
//si es mayor a 1 devuelve null (pasa la validacion) si es menos devuelve un objeto
//minLengthArray que es el error en si.
export function minLengthArray(min : number){
    return (control : AbstractControl) : ValidationErrors | null => {
        const arrayControl = control as FormArray;
        return arrayControl && arrayControl.length >= min ? null : {minLengthArray : true};
    };
}

//Validacion que verifica que el length del arrayControl (el formArray) sea menor a 10,
//funciona exactamente igual que la validacion de arriba
export function maxLengthArray(max : number){
    return (control : AbstractControl) : ValidationErrors | null => {
        const arrayControl = control as FormArray;
        return arrayControl && arrayControl.length <= max ? null : {maxLengthArray : true};
    };
}