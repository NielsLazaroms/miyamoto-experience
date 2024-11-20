import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-inspiration-card',
  standalone: true,
  imports: [],
  templateUrl: './inspiration-card.component.html',
  styleUrl: './inspiration-card.component.css'
})
export class InspirationCardComponent {
  @Input() inspirationCardText: string = "";
  @Input() inspirationCardImage: string =  "";
  @Input() inspirationCardImageAltText: string =  "";
}
