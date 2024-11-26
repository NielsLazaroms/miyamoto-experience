import {Component, HostListener} from '@angular/core';
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {PopUpComponent} from "../../components/pop-up/pop-up.component";


@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [
    NgIf,
    PopUpComponent
  ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css'
})
export class StartPageComponent {
  visibility: boolean = true;

  constructor(private router: Router) {
    setInterval(() => {
      this.visibility = !this.visibility;
    }, 500);
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.router.navigate(['/explanation'])
  }

}
