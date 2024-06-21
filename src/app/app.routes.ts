import { Routes } from '@angular/router';

import { AtikaDominicComponent } from '@pages/atika-dominic/atika-dominic.component';
import { BlogsComponent } from '@pages/blogs/blogs.component';

import { LayoutComponent } from '@shared/components/layout/layout.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: ``,
    component: LayoutComponent,
    children: [
      { path: `info`, component: AtikaDominicComponent },
      { path: ``, component: BlogsComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
