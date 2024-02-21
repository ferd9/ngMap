import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MargersPageComponent } from './margers-page.component';

describe('MargersPageComponent', () => {
  let component: MargersPageComponent;
  let fixture: ComponentFixture<MargersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MargersPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MargersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
