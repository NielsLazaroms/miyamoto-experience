import {Component, AfterViewInit, ChangeDetectorRef} from '@angular/core';
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
  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

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
          markers: true,
          pin: true,
          onUpdate: (self) => {
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
