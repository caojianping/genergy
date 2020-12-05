import { LocalStorage } from 'jts-storage';
import { Base64 } from 'js-base64';
import { CONSTANTS } from '../common/constants';
import { UserInfoModel } from '../models';

export default class TokenHelper {
    static setToken(token: string) {
        return LocalStorage.setItem<string>(CONSTANTS.TOKEN, token, CONSTANTS.EXPIRES);
    }

    static getToken(): string {
        return LocalStorage.getItem<string>(CONSTANTS.TOKEN) || '';
    }

    static removeToken(): boolean {
        return LocalStorage.removeItem(CONSTANTS.TOKEN);
    }

    static getUserInfo(): UserInfoModel | null {
        let token = LocalStorage.getItem<string>(CONSTANTS.TOKEN) || '';
        // console.log('getUserInfo token:', token);
        if (!token) return null;

        let parts = token.split('.');
        // console.log('getUserInfo parts:', parts);
        if (parts.length !== 3) return null;

        try {
            // console.log('getUserInfo parts[1]:', parts[1], Base64.decode(parts[1]));
            let payload = JSON.parse(Base64.decode(parts[1]));
            if (!payload) return null;
            return new UserInfoModel(payload.id, payload.username);
        } catch (err) {
            return null;
        }
    }
}
