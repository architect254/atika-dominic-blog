import { Injectable } from '@angular/core';

import { Article } from 'app/models/article';

import { BehaviorSubject, Observable, catchError } from 'rxjs';

import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService extends APIService {
  readonly API_URL: string = `${this.BASE_URL}/articles`;

  $articles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([
    {
      image_url: `google.com`,
      title: `Lorem Ipsume Title`,
      content: `Lorem Ipsum Content`,
      author: `Atika Dominic`,
      created_date: new Date(),
      updated_date: new Date(),
      row_span: 2,
      col_span: 3,
    },
  ]);

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
            this.snackBar.open(error.toString(), undefined, {
              panelClass: `mat-warn`,
            });
          }
        )
    );
  }
}
