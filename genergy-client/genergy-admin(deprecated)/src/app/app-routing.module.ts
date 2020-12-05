import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../pages/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { AssetListComponent } from '../pages/asset/asset-list/asset-list.component';
import { AssetOperationComponent } from '../pages/asset/asset-operation/asset-operation.component';
import { AssetViewComponent } from '../pages/asset/asset-view/asset-view.component';
import { PlantListComponent } from '../pages/plant/plant-list/plant-list.component';
import { UserListComponent } from '../pages/system/user-list/user-list.component';
import { PasswordSettingComponent } from '../pages/system/password-setting/password-setting.component';
import { AuthSettingComponent } from '../pages/system/auth-setting/auth-setting.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'asset/list', component: AssetListComponent, canActivate: [AuthGuard] },
    { path: 'asset/operation/:mode', component: AssetOperationComponent, canActivate: [AuthGuard] },
    { path: 'asset/view', component: AssetViewComponent, canActivate: [AuthGuard] },
    { path: 'plant/list', component: PlantListComponent, canActivate: [AuthGuard] },
    { path: 'user/list', component: UserListComponent, canActivate: [AuthGuard] },
    { path: 'password/setting', component: PasswordSettingComponent, canActivate: [AuthGuard] },
    { path: 'auth/setting', component: AuthSettingComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
