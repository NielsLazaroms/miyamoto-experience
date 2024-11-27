import {Component, AfterViewInit, ChangeDetectorRef, NgZone} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NgIf, NgStyle } from "@angular/common";
import { Router } from "@angular/router";
import { InspirationCardComponent } from "../../components/inspiration-card/inspiration-card.component";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-inspo-page',
  standalone: true,
  templateUrl: './inspo-page.component.html',
  styleUrls: ['./inspo-page.component.css'],
  imports: [
    NgIf,
    InspirationCardComponent,
    NgStyle
  ]
})
export class InspoPageComponent implements AfterViewInit {
  pipePos: string = '-60px';
  linePos: string = '150px';

  piranaPlantPos: string = '-200px';
  pipePlantPos: string = '-200px';

  characterVisibility: boolean = true;
  deadFlash = false
  intervalCount: number = 0;
  miyamotoImage: string = "./assets/jetpack-miyamoto.png";

  constructor(private router: Router, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.initScrollAnimation();
  }

  initScrollAnimation(): void {
    gsap.fromTo(
      '.scroll-container__miyamoto',
      {
        x: '-40vw'
      },
      {
        x: 500,
        ease: 'none',
        scrollTrigger: {
          trigger: '.scroll-container',
          start: 'top top',
          end: '+=4000',
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            if(this.deadFlash)
              return
            if(self.progress >= 1) {
              this.deadFlash = true
              this.intervalCount = 0
             var characterInterval = setInterval(() => {
                this.intervalCount +=1;
                if(this.intervalCount == 6) {
                  clearInterval(characterInterval)
                  this.miyamotoImage = "./assets/side-view-miyamoto.png";
                  gsap.to('.scroll-container__miyamoto', {
                    y: 300,
                    delay: 1,
                    duration: 3,
                    ease: "power2.out",
                    onComplete: () => {
                      this.router.navigate(['/game']);
                    }
                  });
                }
                this.ngZone.run(() => {
                  this.characterVisibility = !this.characterVisibility
                })
              }, 500)
            }
            this.piranaPlantPos = `${(-200 + self.progress * 270)}px`
            this.pipePlantPos = `${(-200 + self.progress * 120)}px`
            this.pipePos = `${(self.progress * -150) + -60}px`;
            this.linePos = `${(self.progress * -850) + 150}px`;
            this.cdr.detectChanges();
          }
        }
      }
    );
  }
}
