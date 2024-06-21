import { Routes } from '@angular/router';

import { LayoutComponent } from '@core/layout/layout.component';
import { NotFoundComponent } from '@shared/not-found/not-found.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
