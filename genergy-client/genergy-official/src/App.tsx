import React from 'react';
import ReactIntl from 'react-intl-universal';
import { Router } from 'reach-router';
import { Cookie } from 'jts-cookie';

import { CONSTANTS } from './ts/common';
import Home from './views/Home';

import './less/reset.less';
import './less/common.less';

const locales: any = {
    'en-US': require('./ts/langs/en-US.json'),
    'zh-CN': require('./ts/langs/zh-CN.json'),
};

namespace App {
    export interface Props {}

    export interface State {
        title: string;
        isInit: boolean;
    }
}

class App extends React.Component<App.Props, App.State> {
    constructor(props: App.Props, context?: any) {
        super(props, context);
        this.state = {
            title: '',
            isInit: false,
        };
    }

    initLang() {
        let lang = Cookie.getItem<string>(CONSTANTS.LANG) || 'zh-CN';
        ReactIntl.init({ currentLocale: lang, locales: locales }).then(() => this.setState({ isInit: true }));
    }

    componentDidMount() {
        this.initLang();
    }

    render() {
        return (
            <Router mode="hash">
                <Home path="/" />
            </Router>
        );
    }
}

export default App;
