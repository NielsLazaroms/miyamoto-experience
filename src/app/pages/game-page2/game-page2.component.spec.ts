import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePage2Component } from './game-page2.component';

describe('GamePage2Component', () => {
  let component: GamePage2Component;
  let fixture: ComponentFixture<GamePage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePage2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GamePage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
