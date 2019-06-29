// tslint:disable-next-line:file-name-casing
import { AbstractControl, ValidatorFn } from '@angular/forms';

export class OwnValidators {
    static validateBeginningIsbn(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {

            const isbn: string = control.value;
            const head = +isbn.slice(0, 3);

            return head < 978 ? { 'headToSmall': true } : null;
        };
    }

    private static validateIsbnByFormula = (isbn: string) => {
        const sumDignitOnEvenPlaces: number = +isbn[0] + +isbn[2] + +isbn[4] + +isbn[6] + +isbn[8] + +isbn[10];
        const sumDignitOnOddPlaces: number = +isbn[1] + +isbn[3] + +isbn[5] + +isbn[7] + +isbn[9] + +isbn[11];

        return (10 - ((sumDignitOnEvenPlaces + (sumDignitOnOddPlaces * 3)) % 10)) % 10;
    }

    static validateIsbnNumber(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {

            const isbn: string = control.value;
            if (isbn.length !== 13) {
                return null;
            }
            const res = this.validateIsbnByFormula(isbn);

            return res !== +isbn[12] ? { 'Wrong ISBN': true } : null;

        };
    }
}
