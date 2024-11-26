import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {ChatCloudComponent} from "../../components/chat-cloud/chat-cloud.component";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-concept-page',
  standalone: true,
  templateUrl: './concept-page.component.html',
  styleUrls: ['./concept-page.component.css'],
  imports: [
    NgIf,
    ChatCloudComponent
  ]
})
export class ConceptPageComponent implements AfterViewInit {


  constructor(private router: Router) {
  }
  ngAfterViewInit(): void {
    this.initScrollAnimation();
  }


  initScrollAnimation() {
    gsap.to('.scroll-container__miyamoto', {
      y: 500,
      ease: 'none',
      scrollTrigger: {
        trigger: '.scroll-container',
        start: 'top top',
        end: '+=1500',
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          if (self.progress > 0.94) {
            console.log('next page')
            this.router.navigate(['/inspiration'])

          }
        },
      },
    });
    const scrollTriggerSettings = {
      scrub: true,
      markers: true,
      end: '+=500'
    };

    const elements = [
      { selector: '.test-rectangle', start: 'top+=200px center', xFrom: '-100vw', xTo: '1000' },
      { selector: '.test-rectangle2', start: 'top+=500px center', xFrom: '100vw', xTo: '300' },
      { selector: '.test-rectangle3', start: 'top+=500px center', xFrom: '-100vw', xTo: '1200' }
    ];

    gsap.timeline()
      .add(elements.map(({ selector, start, xFrom, xTo }) =>
        gsap.fromTo(selector,
          { x: xFrom },
          {
            x: xTo,
            duration: 20,
            scrollTrigger: {
              ...scrollTriggerSettings,
              trigger: selector,
              start: start
            }
          })
      ));







  }
  }
