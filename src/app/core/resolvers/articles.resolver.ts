import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ArticlesService } from '@core/services/articles.service';
import { Article } from '@models/article';
import { Observable } from 'rxjs';

export const articlesResolver: ResolveFn<Observable<Article[]>> = (
  route,
  state
) => {
  return inject(ArticlesService).getInitialArticles();
};
