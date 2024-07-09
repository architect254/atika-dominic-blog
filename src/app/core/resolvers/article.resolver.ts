import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ArticlesService } from '@core/services/articles.service';
import { Article } from '@models/article';
import { Observable } from 'rxjs';

export const articleResolver: ResolveFn<Observable<Article>> = (
  route,
  state
) => {
  const articleId = route.paramMap.get('id');

  return inject(ArticlesService).getArticleById(articleId);
};
