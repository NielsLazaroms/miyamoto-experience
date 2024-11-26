import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-chat-cloud',
  standalone: true,
  imports: [NgIf],
  templateUrl: './chat-cloud.component.html',
  styleUrls: ['./chat-cloud.component.css']
})
export class ChatCloudComponent implements AfterViewInit, OnDestroy {
  @Input() showTextCloud: boolean = true;
  @Output() cloudTextEmitter = new EventEmitter();
  @Input() cloudText: string[] = [];
  scrollPosition: number = 0;
  sentenceIndex: number = 0;
  textUpdateInterval: any;

  ngAfterViewInit(): void {
    this.startTextUpdate();
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }
  ngOnDestroy(): void {
    if (this.textUpdateInterval) {
      clearInterval(this.textUpdateInterval);
    }
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll(): void {
    this.scrollPosition = window.scrollY;

    if (this.scrollPosition > 150) {
      if (this.showTextCloud) {
        this.showTextCloud = false;
        clearInterval(this.textUpdateInterval);
      }
    } else {

      if (this.sentenceIndex < this.cloudText.length) {
        this.showTextCloud = true;
        this.startTextUpdate();
      }
    }
  }

  startTextUpdate(): void {
    if (this.showTextCloud && this.sentenceIndex < this.cloudText.length ) {
        this.textUpdateInterval = setInterval(() => {
            this.sentenceIndex++;
            if (this.sentenceIndex >= this.cloudText.length) {
              clearInterval(this.textUpdateInterval);
                this.showTextCloud = false;
                this.cloudTextEmitter.emit();
            }
        }, 5000);
      }
    }
}
