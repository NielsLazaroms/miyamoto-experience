import {Component, AfterViewInit, ChangeDetectorRef, NgZone, OnDestroy} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NgIf, NgStyle } from "@angular/common";
import { Router } from "@angular/router";
import { InspirationCardComponent } from "../../components/inspiration-card/inspiration-card.component";
import {AudioSetting} from "./dataSource";
import {CoinServiceService} from "../../services/coin-service.service";
import {ChatCloudComponent} from "../../components/chat-cloud/chat-cloud.component";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-inspo-page',
  standalone: true,
  templateUrl: './inspo-page.component.html',
  styleUrls: ['./inspo-page.component.css'],
  imports: [
    NgIf,
    InspirationCardComponent,
    NgStyle,
    ChatCloudComponent
  ]
})
export class InspoPageComponent implements AfterViewInit, OnDestroy {
  pipePos: string = '-60px';
  linePos: string = '150px';
  piranaPlantPos: string = '-200px';
  pipePlantPos: string = '-200px';
  chatCloudPos: string = '-300px';

  score: number = 0;



  characterVisibility: boolean = true;
  deadFlash = false
  intervalCount: number = 0;
  miyamotoImage: string = "./assets/jetpack-miyamoto.png";

  audioSettings: AudioSetting[] = [
    {
      audio: new Audio('./assets/sounds/kingkong.mp3'),
      startProgress: 0.05,
      endProgress: 0.20,
      hasPlayed: false
    },
    {
      audio: new Audio('./assets/sounds/popeye.mp3'),
      startProgress: 0.3,
      endProgress: 0.60,
      hasPlayed: false

    },
    {
      audio: new Audio('./assets/sounds/pacman.mp3'),
      startProgress: 0.70,
      endProgress: 0.90,
      hasPlayed: false

    }
  ];


  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private coinService: CoinServiceService)
  {
    this.coinService.resetCoins();
    this.score = this.coinService.getCoins();
    this.coinService.coins$.subscribe({
      next:(value)=> {
        this.score = value;
      }
    })
  }

  ngAfterViewInit(): void {
    this.initScrollAnimation();
  }

  ngOnDestroy(): void {
    // Verwijder alle GSAP ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Pauzeer en ontkoppel de audio-objecten
    this.audioSettings.forEach(sound => {
      sound.audio.pause();
      sound.audio.src = ''; // Loskoppelen om geheugen vrij te maken
      sound.audio.removeEventListener('ended', () => {
        this.coinService.addCoins(1);
        sound.hasPlayed = true;
      });
    });

    console.log('Resources cleaned up in ngOnDestroy');
  }

  initScrollAnimation(): void {
    this.audioSettings.forEach(sound => {
      sound.audio.addEventListener('ended', () => {
        this.coinService.addCoins(1);
        sound.hasPlayed = true;
      });
    });


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
                    delay: 0.5,
                    duration: 1,
                    ease: "linear",
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
            console.log(self.progress);
            this.audioSettings.forEach(sound => {
              if (self.progress > sound.startProgress && self.progress < sound.endProgress) {
                if (!sound.hasPlayed && sound.audio.paused) {
                  sound.audio.play().catch(error => {
                    console.error('Error with playing the audio:', error);
                  });
                }
              } else {
                if (!sound.audio.paused) {
                  sound.audio.pause();
                }
              }
            });
            this.piranaPlantPos = `${(-200 + self.progress * 270)}px`
            this.pipePlantPos = `${(-200 + self.progress * 120)}px`
            this.pipePos = `${(self.progress * -150) + -60}px`;
            this.chatCloudPos = `${(-300 + self.progress * window.outerWidth * 0.7 )}px`;
            this.linePos = `${(self.progress * -850) + 150}px`;
            this.cdr.detectChanges();
          }
        }
      }
    );
  }
}
