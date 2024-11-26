import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {GameCoin, GameCoordinate, GameObject, GamePlayer, MovingDirection} from "./dataSource";
import {PopUpComponent} from "../../components/pop-up/pop-up.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-page',
  standalone: true,
    imports: [
        PopUpComponent
    ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent implements AfterViewInit {
  @ViewChild("screen", { static: false })
  canvasElement!: ElementRef;

  private platformSize: GameCoordinate = {
    x: 0.1,
    y: 0.05
  }
  private coinSize: GameCoordinate = {
    x: 0.04,
    y: 0.09
  }

  private overlappingSize: number = this.platformSize.x / 10

  private ctx!: CanvasRenderingContext2D;
  private canvas!: HTMLCanvasElement
  private score: number = 0;

  private backgroundImage = new Image();
  private platformImage = new Image();
  private playerImage = new Image();
  private ladderImage = new Image();
  private finishImage = new Image();
  private coinImage = new Image();

  private player! : GamePlayer;
  private platforms:GameObject[] = [];
  private ladders: GameObject[] = [];
  private finish!: GameObject;
  private coins: GameCoin[] = []
  private keys: { [key: string]: boolean } = {};

  startOverlay: EventEmitter<boolean> = new EventEmitter;
  winOverlay: EventEmitter<boolean> = new EventEmitter;
  gameoverOverlay: EventEmitter<boolean> = new EventEmitter;

  private movementEnabled: boolean = false;


  constructor(private router: Router
  ) {
      this.backgroundImage.src = "assets/background-game.png"
      this.platformImage.src = "assets/donkey-kong-floor.png"
      this.playerImage.src = "assets/mario.png"
      this.ladderImage.src = "assets/ladder.png"
      this.finishImage.src = "assets/finish.png"
      this.coinImage.src = "assets/coin.png"
  }

  ngAfterViewInit(): void {
    this.startOverlay.emit(true);

    this.canvas = this.canvasElement.nativeElement as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')!;
    // this.ctx.imageSmoothingEnabled = false;

    this.player = {
      object: {
        image: this.playerImage,
        position : {
          x: 0.02,
          y: 0.765,
        },
        size: {
          x: 0.075,
          y: 0.15
        },
      },
      movingDirection: MovingDirection.RIGHT
    }
    this.finish = {
      image: this.finishImage,
      position : {
        x: 0.94,
        y: 0.28,
      },
      size: {
        x: 0.075,
        y: 0.15
      },
    }
    this.ladders = [
      {
      image: this.ladderImage,
      position: {
        x: 0.835,
        y: 0.67,
      },
      size: {
        x: 0.08,
        y: 0.2,
      }
      },
      {
        image: this.ladderImage,
        position: {
          x: 0.121,
          y: 0.46,
        },
        size: {
          x: 0.08,
          y: 0.2,
        }
      }
    ]
    this.coins = [{
      object: {
        image: this.coinImage,
        position: {
          x: 0.4,
          y: 0.75,
        },
        size: this.coinSize
      },

      randomValue: Math.random()
    },
      {
        object: {
          image: this.coinImage,
          position: {
            x: 0.6,
            y: 0.55,
          },
          size: this.coinSize
        },

        randomValue: Math.random()
      },
      {
        object: {
          image: this.coinImage,
          position: {
            x: 0.8,
            y: 0.3,
          },
          size: this.coinSize
        },

        randomValue: Math.random()
      }
    ]
    this.createPlatformRow(0.2, 0.45, 9, -0.004)
    this.createPlatformRow(0.1, 0.65, 8, 0.004)
    this.createPlatformRow(0.01, 0.9, 10, -0.004)
    this.gameLoop();

    window.addEventListener("keydown", (event) => this.keyDown(event));
    window.addEventListener("keyup", (event) => this.keyUp(event));

  }

  createPlatformRow(
    startX: number,
    startY: number,
    count: number,
    increaseHeight: number = 0
  ): void {
    const newPlatforms = [];
    for (let i = 0; i < count; i++) {
      newPlatforms.push({
        image: this.platformImage,
        position: {
          x: startX + this.platformSize.x * i - this.overlappingSize * i,
          y: startY + increaseHeight * i,
        },
        size: this.platformSize,
      });
    }
    this.platforms = [...this.platforms, ...newPlatforms];
  }

  private speed = 0.01
  keyDown(event: any) {
    if(!this.movementEnabled)
      return
    this.keys[event.keyCode] = true
  };

  private convertToRealCoordinates(object: GameObject):[number,number,number,number] {
    const x = object.position.x * this.canvas.width;
    const y = object.position.y * this.canvas.height;
    const width = object.size.x * this.canvas.width;
    const height = object.size.y * this.canvas.height;

    return [x, y, width, height]
  }
  private gameLoop() {
    setInterval(() => {
      this.update();
      this.draw();
    }, 20); // 100 ms = 10 keer per seconde
  }


  private update() {
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;

    if(this.calculateDistance(this.finish, this.player.object) < 0.02) {
      this.winOverlay.emit(true);
    }
    this.coins = this.coins.filter(coin => {
      if(!this.isOverlapping(coin.object, this.player.object)) {
        return true
      } else {
        this.score ++
        return false
      }
    });
    this.coins.forEach(coin => {
      coin.object.position.y -= this.calculateSinusValue(coin.randomValue) / 100
      coin.randomValue += 0.05
      coin.object.position.y += this.calculateSinusValue(coin.randomValue) / 100
    })

  let yVelocity = 0
    let xVelocity = 0
    if(this.keys[LEFT]) {
      xVelocity += -this.speed
      this.player.movingDirection = MovingDirection.LEFT
    }
    if(this.keys[RIGHT]) {
      xVelocity += this.speed
      this.player.movingDirection = MovingDirection.RIGHT
    }
    this.player.object.position.x += xVelocity

    let currentLadder = this.getLadderPlayerIsOn()
    let currentPlatform = this.getPlatformBelowPlayer()
    if(currentLadder && this.keys[UP]) {
        yVelocity += this.speed
    } else {
      if(currentPlatform == null) {
        yVelocity = -this.speed
      } else {
        this.player.object.position.y = currentPlatform.position.y - currentPlatform.size.y * 1.25 - this.player.object.size.y / 2
      }
    }
    this.player.object.position.y += -yVelocity
    if(this.player.object.position.y > 1.1) {
      this.gameoverOverlay.emit(true);

    }
  }

  private isOverlapping(
    obj1: GameObject,
    obj2: GameObject,
    verticalMargin: number = 0
  ): boolean {
    // Bereken de randen van het eerste object
    const obj1Left = obj1.position.x - obj1.size.x / 2;
    const obj1Right = obj1.position.x + obj1.size.x / 2;
    const obj1Top = obj1.position.y - obj1.size.y / 2;
    const obj1Bottom = obj1.position.y + obj1.size.y / 2;

    // Bereken de randen van het tweede object
    const obj2Left = obj2.position.x - obj2.size.x / 2;
    const obj2Right = obj2.position.x + obj2.size.x / 2;
    const obj2Top = obj2.position.y - obj2.size.y / 2;
    const obj2Bottom = obj2.position.y + obj2.size.y / 2;

    // Controleer op overlap
    const isHorizontallyOverlapping = obj1Right > obj2Left && obj1Left < obj2Right;
    const isVerticallyOverlapping =
      obj1Bottom + verticalMargin >= obj2Top && obj1Top - verticalMargin <= obj2Bottom;

    return isHorizontallyOverlapping && isVerticallyOverlapping;
  }

  private getPlatformBelowPlayer(): GameObject | null {
    for (const platform of this.platforms) {
      const platformTop = platform.position.y - platform.size.y / 2;
      const playerBottom = this.player.object.position.y + this.player.object.size.y / 2;

      if (
        this.isOverlapping(this.player.object, platform, 0.1) && // Controleer overlap
        playerBottom <= platformTop // Zorg dat speler boven platform is
      ) {
        return platform; // Platform gevonden
      }
    }

    return null;
  }


  private getPlatformAbovePlayer(): GameObject | null {
    for (const platform of this.platforms) {
      const platformBottom = platform.position.y + platform.size.y / 2;
      const playerTop = this.player.object.position.y - this.player.object.size.y / 2;

      if (
        this.isOverlapping(this.player.object, platform, 0.1) && // Controleer overlap
        playerTop >= platformBottom // Zorg dat speler onder platform is
      ) {
        return platform; // Platform gevonden
      }
    }

    return null; // Geen platform boven de speler
  }

  private getLadderPlayerIsOn(): GameObject | null {
    for (const ladder of this.ladders) {
      if (this.isOverlapping(this.player.object, ladder)) {
        return ladder; // Ladder gevonden
      }
    }
    return null; // Geen ladder gevonden
  }

  private draw() {
    // Wis de canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Teken achtergrond
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);

    // Teken Objects
    this.drawObjects(this.platforms)
    this.drawObjects(this.ladders)
    this.drawObjects([this.finish])
    this.drawObjects(this.coins.map(coin => {return coin.object}))

    // Teken speler
    const [x, y, width, height] = this.convertToRealCoordinates(this.player.object);

    this.ctx.save(); // Sla de huidige staat van de context op
    this.ctx.translate(x + width / 2, y + height / 2); // Verplaats naar het midden van de speler
    this.ctx.scale(this.player.movingDirection, 1); // Spiegel horizontaal als movingDirection -1 is
    this.ctx.drawImage(this.player.object.image, -width / 2, -height / 2, width, height); // Teken de speler
    this.ctx.restore(); // Herstel de oorspronkelijke staat van de context


    this.ctx.drawImage(this.coinImage, 0.95 * this.canvas.width, 0.02 * this.canvas.height, 11, 15)
    this.ctx.font = "10px Arial"
    this.ctx.fillStyle = "White"
    this.ctx.textAlign = "end"
    this.ctx.fillText("" + this.score, 0.94 * this.canvas.width, 0.1 * this.canvas.height)
  }

  drawObjects(objects: GameObject[]): void {
    objects.forEach(object => {
      const [x, y, width, height] = this.convertToRealCoordinates(object);
      this.ctx.save();
      this.ctx.translate(x + width / 2, y + height / 2);
      this.ctx.drawImage(object.image, -width / 2, -height / 2, width, height);
      this.ctx.restore();
    });
  }

  private keyUp(event: KeyboardEvent) {
    this.keys[event.keyCode] = false
  }

  private calculateSinusValue(time: number): number {
    const amplitude = 1; // Amplitude: sinuswaarde schommelt tussen -1 en 1
    const frequency = 1; // Frequentie: 1 oscillatie per seconde
    const phaseShift = 0; // Geen faseverschuiving
    const verticalShift = 0; // Geen verticale verschuiving

    // Bereken sinuswaarde
    return amplitude * Math.sin(2 * Math.PI * frequency * time + phaseShift) + verticalShift;
  }

  private calculateDistance(obj1: GameObject, obj2: GameObject): number {
    const dx = obj2.position.x - obj1.position.x;
    const dy = obj2.position.y - obj1.position.y;

    return Math.sqrt(dx * dx + dy * dy);
  }


  navigateToNewPage() {
    if(this.winOverlay) {
      this.router.navigate(['/concepts']);
    }
    if(this.gameoverOverlay) {
      this.router.navigate(['/inspiration']);

    }
  }

  enableMovement() {
    this.movementEnabled = true
  }
}

