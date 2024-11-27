import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameoverPageComponent } from './gameover-page.component';

describe('GameoverPageComponent', () => {
  let component: GameoverPageComponent;
  let fixture: ComponentFixture<GameoverPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameoverPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameoverPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
