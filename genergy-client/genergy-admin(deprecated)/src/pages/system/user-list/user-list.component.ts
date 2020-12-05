import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

import { Utils } from 'src/ts/util';
import { OperateTypeEnum } from 'src/ts/common/enums';
import { OperateTypeNames } from 'src/ts/common/names';
import { PageResult, UserModel, UserFormModel } from 'src/ts/models';
import { UserService } from 'src/ts/services';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.less'],
})
export class UserListComponent implements OnInit {
    Utils: any = Utils;
    OperateTypeNames: Array<string> = OperateTypeNames;

    queryFormGroup: FormGroup;
    isLoading: boolean = false;
    userPageResult: PageResult<UserModel> = {
        current: 1,
        size: 10,
        records: [],
        total: 0,
    };

    operateType: OperateTypeEnum = OperateTypeEnum.Add;
    isVisible: boolean = false;
    currentUser?: UserModel;

    constructor(
        private formBuilder: FormBuilder,
        private modal: NzModalService,
        private message: NzMessageService,
        private userService: UserService
    ) {
        this.queryFormGroup = this.formBuilder.group({
            username: new FormControl(null),
        });
    }

    ngOnInit() {
        this.pageUsers();
    }

    pageUsers(key?: string, $event?: any) {
        let self = this;
        if (key && $event) {
            self.userPageResult[key] = $event;
        }

        let { message, userService, queryFormGroup, userPageResult } = self,
            { current, size } = userPageResult;
        self.isLoading = true;
        userService.pageUsers({ current, size, conditions: queryFormGroup.value }).subscribe({
            next(result: PageResult<UserModel>) {
                self.isLoading = false;
                self.userPageResult = result;
            },
            error(err: any) {
                self.isLoading = false;
                message.error(err);
            },
        });
    }

    queryUsers() {
        if (!this.queryFormGroup.valid) {
            for (const i in this.queryFormGroup.controls) {
                this.queryFormGroup.controls[i].markAsDirty();
                this.queryFormGroup.controls[i].updateValueAndValidity();
            }
            return;
        }

        this.pageUsers();
    }

    addUser() {
        this.operateType = OperateTypeEnum.Add;
        this.currentUser = undefined;
        this.isVisible = true;
    }

    editUser(user: UserModel) {
        this.operateType = OperateTypeEnum.Edit;
        this.currentUser = user;
        this.isVisible = true;
    }

    removeUser(id: number) {
        let self = this,
            { modal, message, userService } = self;
        modal.confirm({
            nzTitle: '确定要删除此用户吗？',
            nzOnOk() {
                userService.removeUser(id).subscribe({
                    next(result: boolean) {
                        if (!result) message.error('删除失败');
                        else self.pageUsers();
                    },
                    error(err: any) {
                        message.error(err);
                    },
                });
            },
        });
    }

    resetPassword(id: number) {
        let self = this,
            { modal, message, userService } = self;
        modal.confirm({
            nzTitle: '确定要重置此用户的密码吗？',
            nzOnOk() {
                userService.resetPassword(id).subscribe({
                    next(result: boolean) {
                        if (!result) message.error('重置失败');
                        else {
                            message.success('重置成功');
                            self.pageUsers();
                        }
                    },
                    error(err: any) {
                        message.error(err);
                    },
                });
            },
        });
    }

    handleModalCancel() {
        this.isVisible = false;
    }

    handleModalOk(userForm: UserFormModel) {
        let self = this,
            { message, userService, operateType } = self;
        if (operateType === OperateTypeEnum.Add) {
            userService.addUser(userForm).subscribe({
                next() {
                    self.pageUsers();
                    self.isVisible = false;
                },
                error(err: any) {
                    message.error(err);
                    self.isVisible = false;
                },
            });
        } else if (operateType === OperateTypeEnum.Edit) {
            userService.updateUser(userForm).subscribe({
                next() {
                    self.pageUsers();
                    self.isVisible = false;
                },
                error(err: any) {
                    message.error(err);
                    self.isVisible = false;
                },
            });
        }
    }
}
