import { Routes } from '@angular/router';

import { AtikaDominicComponent } from '@pages/atika-dominic/atika-dominic.component';
import { ArticlesComponent } from '@pages/articles/articles.component';
import { ArticleComponent } from '@pages/article/article.component';
import { ViewArticleComponent } from '@pages/view-article/view-article.component';
import { AboutAtikaDominicComponent } from '@pages/about-atika-dominic/about-atika-dominic.component';

import { LayoutComponent } from '@shared/components/layout/layout.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { articleResolver } from '@core/resolvers/article.resolver';
import { articlesResolver } from '@core/resolvers/articles.resolver';
import { authorResolver } from '@core/resolvers/author.resolver';

export const routes: Routes = [
  {
    path: ``,
    component: LayoutComponent,
    children: [
      {
        path: `author-details`,
        component: AboutAtikaDominicComponent,
        title: `Set Author Details`,
        resolve: { author: authorResolver },
        data: { action: `Back`, path: `../`, icon: `back` },
      },
      {
        path: `articles`,
        children: [
          {
            path: `create`,
            component: ArticleComponent,
            title: `Create Blog Article`,
            data: { action: `Back`, path: `../`, icon: `back` },
          },
          {
            path: `:id`,
            component: ArticleComponent,
            title: `Update Blog Article`,
            resolve: { article: articleResolver },
            data: { action: `Back`, path: `../`, icon: `back` },
          },
          {
            path: ``,
            component: ArticlesComponent,
            title: `View Blog Articles`,
            resolve: { articles: articlesResolver },
            data: {
              action: {
                label: `Create Article`,
                path: `/articles/create`,
                icon: `add`,
              },
            },
          },
        ],
      },
      {
        path: `:id`,
        component: ViewArticleComponent,
        title: `View Blog Article`,
        resolve: { article: articleResolver },
        data: { action: `Back`, path: `../`, icon: `back` },
      },
      {
        path: ``,
        component: AtikaDominicComponent,
        title: `About Atika Dominic`,
        resolve: { articles: authorResolver },
      },
    ],
  },
  { path: `**`, component: NotFoundComponent },
];
