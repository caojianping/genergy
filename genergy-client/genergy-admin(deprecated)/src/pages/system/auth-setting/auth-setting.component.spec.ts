import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSettingComponent } from './auth-setting.component';

describe('AuthSettingComponent', () => {
    let component: AuthSettingComponent;
    let fixture: ComponentFixture<AuthSettingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthSettingComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthSettingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
