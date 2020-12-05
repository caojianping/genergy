import React from 'react';
import ReactIntl from 'react-intl-universal';
import { Cookie } from 'jts-cookie';
import { CONSTANTS } from '../ts/common';

import androidImg from '../assets/images/android.png';
import iosImg from '../assets/images/ios.png';
import androidDownloadImg from '../assets/images/android-download.png';
import iosDownloadImg from '../assets/images/ios-download.png';
import bannerImg from '../assets/images/banner.png';
import intro01Img from '../assets/images/intro01.png';
import intro02Img from '../assets/images/intro02.png';
import intro03Img from '../assets/images/intro03.png';
import intro04Img from '../assets/images/intro04.png';
import intro05Img from '../assets/images/intro05.png';
import coin01Img from '../assets/images/coin01.png';
import coin02Img from '../assets/images/coin02.png';
import coin03Img from '../assets/images/coin03.png';
import coin04Img from '../assets/images/coin04.png';
import coin05Img from '../assets/images/coin05.png';
import coin06Img from '../assets/images/coin06.png';
import logoImg from '../assets/images/logo.png';
import logoMobileImg from '../assets/images/logo-mobile.png';

namespace Home {
    export interface Props {
        path: string;
    }

    export interface State {
        activeLang: string;
        intros: Array<any>;
    }
}

class Home extends React.Component<Home.Props, Home.State> {
    constructor(props) {
        super(props);
        this.state = {
            activeLang: 'zh-CN',
            intros: [
                { name: 'INTRO01', img: intro01Img },
                { name: 'INTRO02', img: intro02Img },
                { name: 'INTRO03', img: intro03Img },
                { name: 'INTRO04', img: intro04Img },
                { name: 'INTRO05', img: intro05Img },
            ],
        };
    }

    test(event: any) {
        alert('即将上线，敬请期待！');
        return;
    }

    toggleLang(lang: string, event: any) {
        Cookie.setItem<string>(CONSTANTS.LANG, lang, CONSTANTS.ONE_WEEK);
        window.location.reload(true);
    }

    initData() {
        let lang = Cookie.getItem<string>(CONSTANTS.LANG) || 'zh-CN';
        this.setState({ activeLang: lang });
    }

    componentDidMount(): void {
        this.initData();
    }

    render() {
        const { activeLang, intros } = this.state;
        return (
            <div className="home">
                {/* <div className="langs">
                    {['zh-CN', '/', 'en-US'].map((item: string, index: number) => {
                        if (item === '/') return <i key={index}>/</i>;
                        else
                            return (
                                <span
                                    key={index}
                                    className={activeLang === item ? 'active' : ''}
                                    onClick={(event: any) => this.toggleLang(item, event)}
                                >
                                    {{ 'zh-CN': '中文', 'en-US': 'English' }[item]}
                                </span>
                            );
                    })}
                </div> */}

                <div className="container">
                    <div className="header clearfix">
                        <div className="header-content">
                            <img className="logo" src={logoMobileImg} alt={ReactIntl.get('NAME')} />

                            <h1 className="title01">{ReactIntl.get('NAME')}</h1>
                            <h2 className="title02" dangerouslySetInnerHTML={{ __html: ReactIntl.get('TITLE') }} />

                            <ul className="downloads clearfix">
                                <li className="download-item">
                                    {/* <a className="download-btn" href="https://app.scvip.vip/app/android/WealthShop.apk" target="_blank"> */}
                                    <div className="download-btn" onClick={(event: any) => this.test(event)}>
                                        <img src={androidImg} alt={ReactIntl.get('DOWNLOAD01')} />
                                        <span>{ReactIntl.get('DOWNLOAD01')}</span>
                                    </div>
                                    {/* <div className="download-modal">
                                        <img src={androidDownloadImg} alt={ReactIntl.get('DOWNLOAD01')} />
                                    </div> */}
                                </li>

                                <li className="download-item">
                                    {/* <a
                                        className="download-btn"
                                        href="itms-services://?action=download-manifest&url=https://app.scvip.vip/app/ios/manifest.plist"
                                        target="_blank"
                                    > */}
                                    <div className="download-btn" onClick={(event: any) => this.test(event)}>
                                        <img src={iosImg} alt={ReactIntl.get('DOWNLOAD02')} />
                                        <span>{ReactIntl.get('DOWNLOAD02')}</span>
                                    </div>
                                    {/* <div className="download-modal">
                                        <img src={iosDownloadImg} alt={ReactIntl.get('DOWNLOAD02')} />
                                    </div> */}
                                </li>
                            </ul>
                        </div>

                        <img className="header-banner" src={bannerImg} alt={ReactIntl.get('NAME')} />
                    </div>

                    <ul className="intros clearfix">
                        {intros.map((intro: any, index: number) => (
                            <li className="clearfix" key={index}>
                                <img src={intro.img} alt={ReactIntl.get(intro.name)} />
                                <p>{ReactIntl.get(intro.name)}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer">
                    <img className="logo" src={logoImg} alt={ReactIntl.get('NAME')} />
                    <p className="copyright">{ReactIntl.get('COPYRIGHT')}</p>
                    {/* <p className="coins">
                        {ReactIntl.get('COIN_SUPPORT')}：
                        <img src={coin01Img} alt="" />
                        <img src={coin02Img} alt="" />
                        <img src={coin03Img} alt="" />
                        <img src={coin04Img} alt="" />
                        <img src={coin05Img} alt="" />
                        <img src={coin06Img} alt="" />
                    </p> */}
                </div>
            </div>
        );
    }
}

export default Home;
