import { Routes } from '@angular/router';
import {ConceptPageComponent} from "./pages/concept-page/concept-page.component";
import {InspoPageComponent} from "./pages/inspo-page/inspo-page.component";
import {GamePageComponent} from "./pages/game-page/game-page.component";

export const routes: Routes = [
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
];
