import { Injectable } from '@angular/core';

import { Article } from 'app/models/article';

import { BehaviorSubject, Observable, catchError } from 'rxjs';

import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService extends APIService {
  readonly API_URL: string = `${this.BASE_URL}/articles`;

  $articles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

  get articles$(): Observable<Article[]> {
    return this.$articles.asObservable();
  }

  getArticles(): void {
    this.$subscriptions$.add(
      this._http
        .get<Article[]>(this.API_URL, this.httpOptions)
        .pipe(catchError(this.errorHandler))
        .subscribe(
          (articles) => {
            this.$articles.next(articles);
          },
          (error: Error) => {
            this.snackBar.open(error.message, undefined, {
              panelClass: `danger`,
            });
          }
        )
    );
  }
}
