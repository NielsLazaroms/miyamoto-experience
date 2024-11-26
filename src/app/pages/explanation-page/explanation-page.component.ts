import { Component } from '@angular/core';
import {ChatCloudComponent} from "../../components/chat-cloud/chat-cloud.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-explanation-page',
  standalone: true,
  imports: [
    ChatCloudComponent
  ],
  templateUrl: './explanation-page.component.html',
  styleUrl: './explanation-page.component.css'
})
export class ExplanationPageComponent {

  protected readonly navigator = navigator;

  constructor(private router: Router ) {
  }
  navigateToNextPage() {
    this.router.navigate(['/concepts'])
  }
}
