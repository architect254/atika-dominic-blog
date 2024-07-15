import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { Article } from '@models/article';
import { ArticlesService } from '@core/services/articles.service';

export const articleResolver: ResolveFn<Article> = (route, state) => {
  const articleId = route.paramMap.get('id');
  return inject(ArticlesService).getArticleById(articleId);
};
export const articlesResolver: ResolveFn<Article[]> = (route, state) => {
  return inject(ArticlesService).getInitialArticles();
};
