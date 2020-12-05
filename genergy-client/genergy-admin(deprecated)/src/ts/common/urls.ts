import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;
window.console && window.console.log('environment.apiUrl:', apiUrl);

export const Urls = {
    account: {
        login: `${apiUrl}/account/login`,
        logout: `${apiUrl}/account/logout`,
        token: {
            status: `${apiUrl}/account/token/status`,
            refresh: `${apiUrl}/account/token/refresh`,
        },
        setPassword: `${apiUrl}/account/setPassword`,
    },
    upload: {
        cert: `${apiUrl}/upload/cert/`,
        legal: `${apiUrl}/upload/legal/`,
        imgs: `${apiUrl}/upload/imgs/`,
        url: environment.uploadUrl,
    },
    user: {
        page: `${apiUrl}/user/page`,
        add: `${apiUrl}/user/add`,
        update: `${apiUrl}/user/update`,
        resetPassword: `${apiUrl}/user/resetPassword`,
        remove: `${apiUrl}/user/remove`,
    },
    asset: {
        page: `${apiUrl}/asset/page`,
        detail: `${apiUrl}/asset/detail`,
        save: `${apiUrl}/asset/save`,
        submit: `${apiUrl}/asset/submit`,
        setStatus: `${apiUrl}/asset/setStatus`,
    },
    plant: {
        page: `${apiUrl}/plant/page`,
    },
    energy: {
        page: `${apiUrl}/energy/page`,
    },
};
