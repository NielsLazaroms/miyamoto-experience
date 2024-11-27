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
export class ConceptPageComponent implements AfterViewInit, OnDestroy {
  marioPipeAudio = new Audio('./assets/sounds/pipe-sound.mp3');
  private gsapAnimations: GSAPTimeline | null = null;


  constructor(private router: Router) {
  }
  ngOnDestroy(): void {
    // Stop GSAP-animaties en verwijder ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    this.gsapAnimations?.kill();

    // Pauzeer en ontkoppel de audio
    this.marioPipeAudio.pause();
    this.marioPipeAudio.src = '';

    console.log('Resources cleaned up in ngOnDestroy');
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
            this.marioPipeAudio.play().then(() => {
              setTimeout(() => {
                this.router.navigate(['/inspiration']);
              }, this.marioPipeAudio.duration * 1000);
            }).catch((error) => {
              console.error('Error with playing the audio:', error);
              this.router.navigate(['/inspiration']);
            });
          }
        }
      },
    });
    const scrollTriggerSettings = {
      scrub: true,
      end: '+=500'
    };

    const elements = [
      { selector: '.concept-art__donkey-kong', start: 'top+=200px center', xFrom: '-100vw', xTo: '1000' },
      { selector: '.concept-art__mario2', start: 'top+=500px center', xFrom: '100vw', xTo: '300' },
      { selector: '.concept-art__mario', start: 'top+=500px center', xFrom: '-100vw', xTo: '1200' }
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
