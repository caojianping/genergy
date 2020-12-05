import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordSettingComponent } from './password-setting.component';

describe('PwdSettingComponent', () => {
    let component: PasswordSettingComponent;
    let fixture: ComponentFixture<PasswordSettingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PasswordSettingComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordSettingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
