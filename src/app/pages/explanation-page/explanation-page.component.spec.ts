import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplanationPageComponent } from './explanation-page.component';

describe('ExplanationPageComponent', () => {
  let component: ExplanationPageComponent;
  let fixture: ComponentFixture<ExplanationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplanationPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExplanationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
