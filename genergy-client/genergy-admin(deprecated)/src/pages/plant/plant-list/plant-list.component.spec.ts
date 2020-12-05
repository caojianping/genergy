import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantListComponent } from './plant-list.component';

describe('PlantListComponent', () => {
    let component: PlantListComponent;
    let fixture: ComponentFixture<PlantListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlantListComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlantListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
