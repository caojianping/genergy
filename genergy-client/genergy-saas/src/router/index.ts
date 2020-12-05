import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { Token } from '@/ts/common';

import Login from '../views/login';
import Layout from '../views/layout/layout';
import Home from '../views/home';
import Error404 from '../views/error404';

import projectRouter from './project.router';
// import productRouter from './product.router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: 'home',
                name: 'Home',
                component: Home
            },
            ...projectRouter,
            // ...productRouter,
            {
                path: '*',
                name: 'Error404',
                component: Error404
            }
        ]
    }
];

const router = new VueRouter({ mode: 'hash', routes });

// 是否为无需授权页面
function isWithoutAuth(path: string): boolean {
    let urls = ['/login'],
        result = false;
    for (let i = 0; i < urls.length; i++) {
        let url = urls[i];
        if (path.indexOf(url) === 0) {
            result = true;
            break;
        }
    }
    return result;
}

router.beforeEach((to, from, next) => {
    Vue.prototype.cancelRequest();

    let tokenInfo: any = Token.getTokenInfo() || {},
        token = tokenInfo.token;
    if (isWithoutAuth(to.path)) {
        if (token) next('/home');
        else next();
    } else {
        if (token) next();
        else {
            Token.removeTokenInfo();
            next('/login');
        }
    }
});

export default router;
