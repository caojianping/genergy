import Vue from 'vue';
import { Mutation, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN.js';
import TYPES from './store/types';
import { Token } from './ts/common';

@Component({ name: 'App' })
export default class App extends Vue {
    @State('isFullLoading') isFullLoading!: boolean;
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;
    @Mutation(TYPES.CLEAR_STATES) clearRootStates!: () => any;

    locale: string = zh_CN;

    created() {
        console.log('App created:', Token.getTokenInfo());
        this.setRootStates({ tokenInfo: Token.getTokenInfo() });
    }
}
