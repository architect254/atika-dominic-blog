import { Routes } from '@angular/router';

import { AtikaDominicComponent } from '@pages/atika-dominic/atika-dominic.component';
import { ArticlesComponent } from '@pages/articles/articles.component';
import { ArticleComponent } from '@pages/article/article.component';
import { ViewArticleComponent } from '@pages/view-article/view-article.component';
import { AboutAtikaDominicComponent } from '@pages/about-atika-dominic/about-atika-dominic.component';

import { LayoutComponent } from '@shared/components/layout/layout.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { articleResolver } from '@core/resolvers/article.resolver';
import { actionResolver } from '@core/resolvers/action.resolver';
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
        resolve: { article: articleResolver, action: actionResolver },
      },
      {
        path: `articles`,
        children: [
          {
            path: `create`,
            component: ArticleComponent,
            title: `Create Blog Article`,
            resolve: { article: articleResolver, action: actionResolver },
          },
          {
            path: `:id`,
            component: ArticleComponent,
            title: `Update Blog Article`,
            resolve: { article: articleResolver, action: actionResolver },
          },
          {
            path: ``,
            component: ArticlesComponent,
            title: `View Blog Articles`,
            resolve: { articles: articlesResolver, action: actionResolver },
          },
        ],
      },
      {
        path: `:id`,
        component: ViewArticleComponent,
        title: `View Blog Article`,
        resolve: { articles: articleResolver, action: actionResolver },
      },
      {
        path: ``,
        component: AtikaDominicComponent,
        title: `About Atika Dominic`,
        resolve: { articles: authorResolver, action: actionResolver },
      },
    ],
  },
  { path: `**`, component: NotFoundComponent },
];
