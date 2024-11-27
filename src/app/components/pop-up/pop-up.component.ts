import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [
    NgIf,
    NgStyle
  ],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent implements OnInit{
  visibility: boolean = false;
  @Input() title: string = "";
  @Input() image?: string = "";
  @Input() altText?: string = "";
  @Input() visibilityEmitter!: EventEmitter<boolean>;
  @Output() popupVisibilityChangedEmitter = new EventEmitter();

  ngOnInit(): void {
    this.visibilityEmitter.subscribe(visibility => {
      setTimeout(() => {
        this.visibility = visibility;
        if(this.visibility) {
          setTimeout(() => {
            this.visibility = false;
            this.popupVisibilityChangedEmitter.emit();
          }, 5000)
        }
      },0)
    })
  }
}
