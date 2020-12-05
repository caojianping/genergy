// IE兼容及优化
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import router from '@/router';
import store from '@/store';

// antd
import { message } from 'ant-design-vue';
import antd from './antd';
antd();

// moment
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// extend
import './extends/validator.extend';
import './extends/vue.extend';

import App from '@/App.vue';
import 'ant-design-vue/dist/antd.less';
import '@/less/reset.less';
import '@/less/common.less';
import '@/less/antd.less';
import '@/less/icons.less';

Vue.prototype.$message = message;
Vue.prototype.moment = moment;
Vue.prototype.cancelRequest = function() {
    if (window['cancelAxios']) {
        window['cancelAxios']();
    }
};
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
