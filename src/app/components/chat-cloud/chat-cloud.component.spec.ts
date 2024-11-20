import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCloudComponent } from './chat-cloud.component';

describe('ChatCloudComponent', () => {
  let component: ChatCloudComponent;
  let fixture: ComponentFixture<ChatCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatCloudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
