import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { IconsProviderModule } from './icons-provider.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutComponent } from '../components/layout/layout.component';
import { UserModalComponent } from '../components/user-modal/user-modal.component';

import { LoginComponent } from '../pages/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { AssetListComponent } from '../pages/asset/asset-list/asset-list.component';
import { AssetOperationComponent } from '../pages/asset/asset-operation/asset-operation.component';
import { AssetViewComponent } from '../pages/asset/asset-view/asset-view.component';
import { PlantListComponent } from '../pages/plant/plant-list/plant-list.component';
import { UserListComponent } from '../pages/system/user-list/user-list.component';
import { PasswordSettingComponent } from '../pages/system/password-setting/password-setting.component';
import { AuthSettingComponent } from '../pages/system/auth-setting/auth-setting.component';

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        UserModalComponent,
        LoginComponent,
        HomeComponent,
        AssetListComponent,
        AssetOperationComponent,
        AssetViewComponent,
        PlantListComponent,
        AuthSettingComponent,
        UserListComponent,
        PasswordSettingComponent,
        AuthSettingComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        IconsProviderModule,
        NgZorroAntdModule,
        NzMessageModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
    ],
    providers: [{ provide: NZ_I18N, useValue: zh_CN }],
    bootstrap: [AppComponent],
})
export class AppModule {}
