export class LoginFormModel {
    public companyName!: string; // 企业名称
    public userName!: string; // 用户名
    public password!: string; // 密码

    constructor() {
        // this.companyName = '建融湘安新能源有限责任公司';
        this.companyName = '';
        this.userName = '';
        this.password = '';
    }
}
