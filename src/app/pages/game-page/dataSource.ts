export interface GameObject {
  image: HTMLImageElement;
  position: GameCoordinate;
  size: GameCoordinate;
}
export interface GameCoordinate {
  x: number;
  y: number;
}
export interface GamePlayer {
  object: GameObject;
  movingDirection: MovingDirection;
}
export interface GameCoin {
  object: GameObject;
  randomValue: number;
}

export enum MovingDirection {
  LEFT= -1,
  RIGHT =1,
}
