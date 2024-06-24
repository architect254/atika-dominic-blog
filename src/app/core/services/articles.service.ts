import { Injectable } from '@angular/core';

import { Article } from 'app/models/article';

import { BehaviorSubject, Observable, catchError } from 'rxjs';

import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService extends APIService {
  protected override endpoint: string = `${this.BASE_URL}/articles`;

  $articles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
  $selectedArticle: BehaviorSubject<Article> = new BehaviorSubject<Article>(
    {} as Article
  );

  get articles$(): Observable<Article[]> {
    return this.$articles.asObservable();
  }

  get selectedArticle$(): Observable<Article> {
    return this.$selectedArticle.asObservable();
  }

  getArticles(onError?: () => void): void {
    const endpoint = `${this.endpoint}/`;

    this.$subscriptions$.add(
      this._http
        .get<Article[]>(endpoint, this.httpOptions)
        .pipe(catchError(this.errorHandler))
        .subscribe(
          (articles) => {
            this.$articles.next(articles);
          },
          (error: Error) => {
            this.snackBar.open(error.toString(), undefined, {
              panelClass: `mat-warn`,
            });
            onError?.();
          }
        )
    );
  }

  getArticleById(id: string, onError?: () => void): void {
    const endpoint = `${this.endpoint}/${id}`;
    this.$subscriptions$.add(
      this._http
        .get<Article>(endpoint, this.httpOptions)
        .pipe(catchError(this.errorHandler))
        .subscribe(
          (article) => {
            this.$selectedArticle.next(article);
          },
          (error: Error) => {
            this.snackBar.open(error.toString(), undefined, {
              panelClass: `mat-warn`,
            });
            onError?.();
          }
        )
    );
  }
}
