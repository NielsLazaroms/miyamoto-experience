import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
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
    console.log('in func')
    if (this.showTextCloud && this.sentenceIndex < this.cloudText.length ) {
      console.log('in first if')
        this.textUpdateInterval = setInterval(() => {
            this.sentenceIndex++;
            console.log('sentence '+ this.sentenceIndex);
            console.log('cloud' + this.cloudText.length)
            if (this.sentenceIndex >= this.cloudText.length) {
              clearInterval(this.textUpdateInterval);
                this.showTextCloud = false;
            }
        }, 7000);
      }
    }
}
