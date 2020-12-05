import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Urls } from '../common/urls';
import { TokenHelper } from '../helpers';
import { PasswordFormModel } from '../models';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
    public loginStatus: boolean = !!TokenHelper.getToken();
    public redirectUrl: string = '';

    constructor(private httpService: HttpService) {}

    login(username: string, password: string): Observable<string> {
        return this.httpService
            .post<string>(Urls.account.login, { username: username, password: password })
            .pipe(
                tap((token: string) => {
                    if (token) {
                        this.loginStatus = true;
                        TokenHelper.setToken(token);
                    }
                    return token;
                })
            );
    }

    logout(): Observable<boolean> {
        return this.httpService.get<boolean>(Urls.account.logout).pipe(
            tap((result: boolean) => {
                if (result) {
                    this.loginStatus = false;
                    TokenHelper.removeToken();
                }
                return result;
            })
        );
    }

    getTokenStatus(): Observable<boolean> {
        return this.httpService.get<boolean>(Urls.account.token.status);
    }

    refreshToken(): Observable<string> {
        return this.httpService.get<string>(Urls.account.token.refresh).pipe(
            tap((token: string) => {
                if (token) {
                    this.loginStatus = true;
                    TokenHelper.setToken(token);
                }
                return token;
            })
        );
    }

    setPassword(passwordForm: PasswordFormModel): Observable<boolean> {
        return this.httpService.post<boolean>(Urls.account.setPassword, passwordForm).pipe(
            tap((result: boolean) => {
                if (result) {
                    this.loginStatus = false;
                    TokenHelper.removeToken();
                }
                return result;
            })
        );
    }
}
