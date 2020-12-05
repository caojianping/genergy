import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { TokenHelper } from 'src/ts/helpers';
import { AccountService } from 'src/ts/services';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit {
    username: string = '';
    isCollapsed: boolean = false;
    menus: Array<any> = [];

    constructor(private router: Router, private message: NzMessageService, private accountService: AccountService) {}

    logout() {
        const { router, message, accountService } = this;
        accountService.logout().subscribe({
            next(data: boolean) {
                if (data) {
                    TokenHelper.removeToken();
                    router.navigateByUrl('/login');
                } else message.error('注销失败');
            },
            error(err: any) {
                message.error(err);
            },
        });
    }

    ngOnInit() {
        let userInfo = TokenHelper.getUserInfo();
        console.log('userInfo:', userInfo);
        if (userInfo) {
            this.username = userInfo.username;
            this.menus = [
                {
                    name: '资产管理',
                    route: null,
                    icon: 'database',
                    items: [{ name: '资产列表', route: '/asset/list', icon: null }],
                },
                {
                    name: '电站管理',
                    route: null,
                    icon: 'code-sandbox',
                    items: [{ name: '电站列表', route: '/plant/list', icon: null }],
                },
                {
                    name: '系统管理',
                    route: null,
                    icon: 'setting',
                    items: [
                        { name: '用户列表', route: '/user/list', icon: null },
                        { name: '密码设置', route: '/password/setting', icon: null },
                        // { name: '权限设置', route: '/auth/setting', icon: null },
                    ],
                },
            ];
        }
    }
}
