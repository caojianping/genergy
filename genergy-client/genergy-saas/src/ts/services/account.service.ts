import Validator, { ValidationResult } from 'jpts-validator';
import { Caxios, md5 } from '@/ts/common';
import { Urls, CaxiosType } from '@/ts/config';
import { LoginFormModel } from '@/ts/models';

export class AccountService {
    // 验证登录表单
    public static validateLoginForm(loginForm: LoginFormModel): ValidationResult {
        if (!loginForm) return { status: false, data: { loginForm: '登录表单不可以为空' } };

        let key = 'loginForm',
            { companyName, userName, password } = loginForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'companyName', value: companyName },
            { required: true },
            { required: '企业名称不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'userName', value: userName },
            { required: true },
            { required: '用户名不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'password', value: password },
            { required: true },
            { required: '密码不可以为空' }
        );
        return validator.execute(key);
    }

    // 登录
    public async login(loginForm: LoginFormModel): Promise<string> {
        let result = await Caxios.post<any>(
            {
                url: Urls.account.login,
                data: {
                    companyName: loginForm.companyName,
                    userName: loginForm.userName,
                    password: md5(loginForm.password)
                }
            },
            CaxiosType.FullLoading
        );
        return result || '';
    }

    public async logout(): Promise<boolean> {
        await Caxios.post<any>({ url: Urls.account.logout }, CaxiosType.FullLoadingToken);
        return true;
    }
}
