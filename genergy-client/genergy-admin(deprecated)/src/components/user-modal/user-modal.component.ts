import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

import { OperateTypeEnum } from 'src/ts/common/enums';
import { OperateTypeNames } from 'src/ts/common/names';
import { UserModel, UserFormModel } from 'src/ts/models';

@Component({
    selector: 'app-user-modal',
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.less'],
})
export class UserModalComponent implements OnInit {
    @Input() operateType: OperateTypeEnum;
    @Input() visible: boolean;
    @Input() user?: UserModel;

    @Output() onCancel = new EventEmitter<void>();
    @Output() onOk = new EventEmitter<UserFormModel>();

    OperateTypeNames: Array<string> = OperateTypeNames;
    userFormGroup: FormGroup;

    constructor(private formBuilder: FormBuilder, private message: NzMessageService) {
        this.userFormGroup = this.formBuilder.group({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null),
        });
    }

    ngOnInit() {}

    openUser() {
        let operateType = this.operateType;
        if (operateType === OperateTypeEnum.Add) {
            this.userFormGroup = this.formBuilder.group({
                username: new FormControl(null, Validators.required),
                password: new FormControl(null),
            });
        } else if (operateType === OperateTypeEnum.Edit) {
            let user = this.user;
            if (user) {
                this.userFormGroup = this.formBuilder.group({
                    username: new FormControl(user.username, Validators.required),
                });
            }
        }
    }

    closeUser() {
        this.onCancel.emit();
    }

    saveUser(formData: any) {
        if (!this.userFormGroup.valid) {
            for (const i in this.userFormGroup.controls) {
                this.userFormGroup.controls[i].markAsDirty();
                this.userFormGroup.controls[i].updateValueAndValidity();
            }
            return;
        }

        let operateType = this.operateType;
        if (operateType === OperateTypeEnum.Add) {
            this.onOk.emit(<UserFormModel>formData);
        } else if (operateType === OperateTypeEnum.Edit) {
            formData['id'] = this.user.id;
            this.onOk.emit(<UserFormModel>formData);
        }
    }
}
