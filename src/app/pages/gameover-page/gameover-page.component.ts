import {Component, HostListener} from '@angular/core';
import {ChatCloudComponent} from "../../components/chat-cloud/chat-cloud.component";
import {NgIf, NgStyle} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-gameover-page',
  standalone: true,
  imports: [
    ChatCloudComponent,
    NgIf,
    NgStyle
  ],
  templateUrl: './gameover-page.component.html',
  styleUrl: './gameover-page.component.css'
})
export class GameoverPageComponent {
  showEndScreen: boolean = false;

  constructor(private router: Router) {
    setTimeout(() => {
      this.showEndScreen = true;
    },5000)
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.router.navigate(['/game'])
  }
}
