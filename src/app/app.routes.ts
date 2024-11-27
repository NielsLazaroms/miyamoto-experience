import { Routes } from '@angular/router';
import {ConceptPageComponent} from "./pages/concept-page/concept-page.component";
import {InspoPageComponent} from "./pages/inspo-page/inspo-page.component";
import {GamePageComponent} from "./pages/game-page/game-page.component";
import {StartPageComponent} from "./pages/start-page/start-page.component";
import {ExplanationPageComponent} from "./pages/explanation-page/explanation-page.component";
import {GameoverPageComponent} from "./pages/gameover-page/gameover-page.component";
import {YouWinPageComponent} from "./pages/you-win-page/you-win-page.component";

export const routes: Routes = [
  {
    path: '',
    component: StartPageComponent,
  },
  {
    path: 'explanation',
    component: ExplanationPageComponent,
  },
  {
    path: 'concepts',
    component: ConceptPageComponent,
  },
  {
    path: 'inspiration',
    component: InspoPageComponent,
  },
  {
    path: 'game',
    component: GamePageComponent,
  },
  {
    path: 'game-over',
    component: GameoverPageComponent,
  },
  {
    path: 'you-win',
    component: YouWinPageComponent,
  }
];
