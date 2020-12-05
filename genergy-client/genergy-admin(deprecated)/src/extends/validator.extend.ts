import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export type GenergyValidationErrors = Record<string, any>;

export class GenergyValidators extends Validators {
    static minLength(minLength: number): ValidatorFn {
        return (control: AbstractControl): GenergyValidationErrors | null => {
            if (Validators.minLength(minLength)(control) === null) {
                return null;
            }
            return { minlength: `最小长度为${minLength}` };
        };
    }

    static password(control: AbstractControl): GenergyValidationErrors | null {
        const value = control.value;
        if (!value) {
            return null;
        }

        return !/^(?![a-z]+$)(?![A-Z]+$)(?![\W_]+$)(?![0-9]+$)[a-zA-Z0-9\W_][^\u4e00-\u9fa5]{7,14}$/.test(value)
            ? { mobile: '密码格式不正确' }
            : null;
    }

    static mobile(control: AbstractControl): GenergyValidationErrors | null {
        const value = control.value;
        if (!value) {
            return null;
        }

        return !/^(0|86|17951)?(1[0-9][0-9])[0-9]{8}$/.test(value) ? { mobile: '手机号格式不正确' } : null;
    }
}
