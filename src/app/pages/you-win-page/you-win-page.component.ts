import { Component } from '@angular/core';
import {ChatCloudComponent} from "../../components/chat-cloud/chat-cloud.component";
import {NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-you-win-page',
  standalone: true,
  imports: [
    ChatCloudComponent,
    NgIf,
    NgStyle
  ],
  templateUrl: './you-win-page.component.html',
  styleUrl: './you-win-page.component.css'
})
export class YouWinPageComponent {
  showEndScreen: boolean = false;


  constructor() {
    setTimeout(() =>{
      this.showEndScreen = true;
    }, 5000)
  }
}
