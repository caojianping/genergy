export class UserInfoModel {
    public id!: number;
    public username!: string;

    constructor(id: number, username: string) {
        this.id = id;
        this.username = username;
    }
}

export class UserModel {
    public id!: number;
    public username!: string;
    public createTime!: Date;
    public modifyTime?: Date;
}

export class UserFormModel {
    public id?: number;
    public username!: string;
    public password!: string;
}

export class PasswordFormModel {
    public newPwd!: string;
    public confirmPwd!: string;

    constructor(newPwd: string, confirmPwd: string) {
        this.newPwd = newPwd;
        this.confirmPwd = confirmPwd;
    }
}
