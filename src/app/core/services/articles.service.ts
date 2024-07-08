import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable, Observer, tap } from 'rxjs';

import { Article, ArticlePayload } from '@models/article';

import { CommentPayload } from '@models/comment';
import { PaginationParams } from '@models/constants';

import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService extends APIService {
  protected override endpoint: string = `${this.BASE_URL}/articles`;

  $articles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
  $selectedArticle: BehaviorSubject<Article | null> =
    new BehaviorSubject<Article | null>(null);

  $comments: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);
  $selectedComment: BehaviorSubject<Comment | null> =
    new BehaviorSubject<Comment | null>(null);

  constructor() {
    super();
  }

  get articles$(): Observable<Article[]> {
    return this.$articles.asObservable();
  }

  get selectedArticle$(): Observable<Article | null> {
    return this.$selectedArticle.asObservable();
  }

  createArticle(payload: ArticlePayload, observer: Observer<Article>) {
    const endpoint = `${this.endpoint}`;
    return this._http
      .post<Article>(endpoint, payload, this.httpOptions)
      .subscribe(observer);
  }

  updateArticle(
    id: string,
    payload: ArticlePayload,
    observer: Observer<Article>
  ) {
    const endpoint = `${this.endpoint}/${id}`;
    return this._http
      .put<Article>(endpoint, this.httpOptions)
      .subscribe(observer);
  }

  uploadArticleHeaderImage(
    id: string,
    payload: Article,
    observer: Observer<Article>
  ) {
    const endpoint = `${this.endpoint}/${id}/upload-header-image`;
    return this._http
      .put<Article>(endpoint, this.httpOptions)
      .pipe(
        tap({
          next: (article) => {
            this.$selectedArticle.next(article);
          },
          error: (err: any) => {
            this.$selectedArticle.next(null);
          },
          complete: () => {
            console.info(`GET ARTICLES COMPLETE`);
          },
        })
      )
      .subscribe(observer);
  }

  getArticles(
    { page, pageSize }: PaginationParams,
    observer: Observer<Article[]>
  ) {
    const endpoint = `${this.endpoint}`;

    let params = new HttpParams()
      .set(`page`, page)
      .append(`pageSize`, pageSize);

    const options = { ...this.httpOptions, params };

    return this._http
      .get<Article[]>(endpoint, options)
      .pipe(
        tap({
          next: (articles) => {
            this.$articles.next(articles);
          },
          error: (err: any) => {
            this.$articles.next([]);
          },
          complete: () => {
            console.info(`GET ARTICLES COMPLETE`);
          },
        })
      )
      .subscribe(observer);
  }

  getArticleById(id: string | null, observer: Observer<Article>) {
    const endpoint = `${this.endpoint}/${id}`;
    return this._http
      .get<Article>(endpoint, this.httpOptions)
      .pipe(
        tap({
          next: (article) => {
            this.$selectedArticle.next(article);
          },
          error: (err: any) => {
            this.$selectedArticle.next(null);
          },
          complete: () => {
            console.info(`GET ARTICLES COMPLETE`);
          },
        })
      )
      .subscribe(observer);
  }

  deleteArticle(id: string, observer: Observer<void>) {
    const endpoint = `${this.endpoint}/${id}`;
    console.log(`DELETE ARTICLE 1`);

    return this._http
      .delete<void>(endpoint, this.httpOptions)
      .subscribe(observer);
  }

  createComment(payload: CommentPayload, observer: Observer<Comment>) {
    const endpoint = `${this.endpoint}/comments`;
    return this._http
      .post<Comment>(endpoint, this.httpOptions)
      .subscribe(observer);
  }

  getComments(observer: Observer<Comment[]>) {
    const endpoint = `${this.endpoint}/comments`;

    return this._http
      .get<Comment[]>(endpoint, this.httpOptions)
      .subscribe(observer);
  }

  deleteComment(id: string, observer: Observer<void>) {
    const endpoint = `${this.endpoint}/comments/${id}`;
    return this._http
      .delete<void>(endpoint, this.httpOptions)
      .subscribe(observer);
  }
}
