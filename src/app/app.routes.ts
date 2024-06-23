import { Routes } from '@angular/router';

import { AtikaDominicComponent } from '@pages/atika-dominic/atika-dominic.component';
import { ArticlesComponent } from '@pages/articles/articles.component';

import { LayoutComponent } from '@shared/components/layout/layout.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: ``,
    component: LayoutComponent,
    children: [
      { path: `info`, component: AtikaDominicComponent },
      { path: ``, component: ArticlesComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
