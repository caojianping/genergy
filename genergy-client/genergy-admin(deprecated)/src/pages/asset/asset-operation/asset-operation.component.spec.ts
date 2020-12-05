import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetOperationComponent } from './asset-operation.component';

describe('AssetOperationComponent', () => {
  let component: AssetOperationComponent;
  let fixture: ComponentFixture<AssetOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
