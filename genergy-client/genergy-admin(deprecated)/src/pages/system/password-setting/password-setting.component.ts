import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

import { PasswordFormModel } from 'src/ts/models';
import { AccountService } from '../../../ts/services';

@Component({
    selector: 'app-password-setting',
    templateUrl: './password-setting.component.html',
    styleUrls: ['./password-setting.component.less'],
})
export class PasswordSettingComponent implements OnInit {
    formGroup: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private message: NzMessageService,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            newPwd: new FormControl(null, Validators.required),
            confirmPwd: new FormControl(null, Validators.required),
        });
    }

    setPassword(formData: any): void {
        if (!this.formGroup.valid) {
            for (const i in this.formGroup.controls) {
                this.formGroup.controls[i].markAsDirty();
                this.formGroup.controls[i].updateValueAndValidity();
            }
            return;
        }

        let { router, message, accountService } = this,
            { newPwd, confirmPwd } = formData;
        if (newPwd !== confirmPwd) {
            message.warning('两次密码不一致');
            return;
        }

        let msgDf = message.loading('密码修改中……'),
            passwordForm = new PasswordFormModel(newPwd, confirmPwd);
        accountService.setPassword(passwordForm).subscribe({
            next(result: boolean) {
                if (!result) {
                    message.remove(msgDf.messageId);
                    message.error('密码修改失败');
                } else {
                    setTimeout(() => {
                        message.remove(msgDf.messageId);
                        message.success('密码修改成功，请重新登录');
                        router.navigateByUrl('/login');
                    }, 1688);
                }
            },
            error(err: any) {
                message.remove(msgDf.messageId);
                message.error(err);
            },
        });
    }
}
