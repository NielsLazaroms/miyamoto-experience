import { Component } from '@angular/core';
import {ChatCloudComponent} from "../../components/chat-cloud/chat-cloud.component";
import {NgIf, NgStyle} from "@angular/common";
import {CoinServiceService} from "../../services/coin-service.service";

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
  score: number = 0;


  constructor(private coinService: CoinServiceService
  ) {
    this.score = this.coinService.getCoins();
    setTimeout(() =>{
      this.showEndScreen = true;
    }, 5000)
  }

}
