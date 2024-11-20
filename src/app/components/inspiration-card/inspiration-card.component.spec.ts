import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspirationCardComponent } from './inspiration-card.component';

describe('InspirationCardComponent', () => {
  let component: InspirationCardComponent;
  let fixture: ComponentFixture<InspirationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspirationCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InspirationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
