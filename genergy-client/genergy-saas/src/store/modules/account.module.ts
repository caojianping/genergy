import TYPES from '@/store/types';
import { IActionContext, IAccountState } from '@/store/interfaces';

import { Token } from '@/ts/common';
import { TokenInfo, LoginFormModel } from '@/ts/models';
import { AccountService } from '@/ts/services';

const accountService = new AccountService();
const accountState: IAccountState = {
    loginForm: new LoginFormModel()
};

export default {
    namespaced: true,
    state: accountState,
    mutations: {
        [TYPES.SET_STATES](state: IAccountState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IAccountState) {
            state.loginForm = new LoginFormModel();
        }
    },
    actions: {
        async login(context: IActionContext<IAccountState>): Promise<boolean> {
            let { commit, state } = context,
                loginForm = state.loginForm,
                token = await accountService.login(loginForm),
                tokenInfo = new TokenInfo(token, loginForm.companyName, loginForm.userName);
            Token.setTokenInfo(tokenInfo);
            commit(TYPES.SET_STATES, { tokenInfo }, { root: true });
            return true;
        },

        async logout(context: IActionContext<IAccountState>): Promise<boolean> {
            let result = await accountService.logout();
            if (result) {
                Token.removeTokenInfo();
            }
            return result;
        }
    }
};
