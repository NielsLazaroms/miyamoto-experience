import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouWinPageComponent } from './you-win-page.component';

describe('YouWinPageComponent', () => {
  let component: YouWinPageComponent;
  let fixture: ComponentFixture<YouWinPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YouWinPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YouWinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
