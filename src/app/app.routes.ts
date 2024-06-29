import { Routes } from '@angular/router';

import { AtikaDominicComponent } from '@pages/atika-dominic/atika-dominic.component';
import { ArticlesComponent } from '@pages/articles/articles.component';
import { ArticleComponent } from '@pages/article/article.component';

import { LayoutComponent } from '@shared/components/layout/layout.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { ViewArticleComponent } from '@pages/view-article/view-article.component';

export const routes: Routes = [
  {
    path: ``,
    component: LayoutComponent,
    children: [
      { path: `info`, component: AtikaDominicComponent },
      {
        path: `articles`,
        children: [
          { path: `create`, component: ArticleComponent },
          { path: `:id`, component: ArticleComponent },
          { path: ``, component: ArticlesComponent },
        ],
      },
      { path: `:id`, component: ViewArticleComponent },
      { path: ``, redirectTo: `/articles`, pathMatch: `full` },
    ],
  },
  { path: `**`, component: NotFoundComponent },
];
