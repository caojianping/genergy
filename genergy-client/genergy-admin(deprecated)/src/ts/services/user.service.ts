import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Utils } from '../util';
import { Urls } from '../common/urls';
import { IUserPageConditions, IPageParameters } from '../interfaces';
import { PageResult, UserModel, UserFormModel } from '../models';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private httpService: HttpService) {}

    pageUsers(pageParameters: IPageParameters<IUserPageConditions>): Observable<PageResult<UserModel>> {
        let { current, size, conditions } = pageParameters,
            parameters = Utils.buildParameters(conditions);
        return this.httpService.get<PageResult<UserModel>>(`${Urls.user.page}/${current}/${size}?${parameters}`);
    }

    addUser(userForm: UserFormModel): Observable<boolean> {
        delete userForm.id;
        return this.httpService.post<boolean>(Urls.user.add, userForm);
    }

    updateUser(userForm: UserFormModel): Observable<boolean> {
        return this.httpService.post<boolean>(Urls.user.update, userForm);
    }

    resetPassword(id: number): Observable<boolean> {
        return this.httpService.post<boolean>(`${Urls.user.resetPassword}/${id}`, null);
    }

    removeUser(id: number): Observable<boolean> {
        return this.httpService.post<boolean>(`${Urls.user.remove}/${id}`, null);
    }
}
