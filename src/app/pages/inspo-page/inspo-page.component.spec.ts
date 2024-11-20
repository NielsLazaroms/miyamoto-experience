import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspoPageComponent } from './inspo-page.component';

describe('InspoPageComponent', () => {
  let component: InspoPageComponent;
  let fixture: ComponentFixture<InspoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InspoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
