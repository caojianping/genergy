import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { AccountService } from '../../ts/services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private message: NzMessageService,
        private accountService: AccountService
    ) {}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
            remember: new FormControl(true),
        });
    }

    login(formData: any): void {
        if (!this.loginForm.valid) {
            for (const i in this.loginForm.controls) {
                this.loginForm.controls[i].markAsDirty();
                this.loginForm.controls[i].updateValueAndValidity();
            }
            return;
        }

        const { router, message, accountService } = this;
        let msgDf = message.loading('登录中……');
        accountService.login(formData.username, formData.password).subscribe({
            next(token: string) {
                if (!token) {
                    message.remove(msgDf.messageId);
                    message.error('登录失败');
                } else {
                    let redirectUrl = accountService.redirectUrl
                        ? router.parseUrl(accountService.redirectUrl)
                        : '/home';
                    setTimeout(() => {
                        message.remove(msgDf.messageId);
                        router.navigateByUrl(redirectUrl);
                    }, 1000);
                }
            },
            error(err: any) {
                message.remove(msgDf.messageId);
                message.error(err);
            },
        });
    }
}
