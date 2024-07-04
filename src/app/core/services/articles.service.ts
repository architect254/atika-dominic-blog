import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

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
  $selectedArticle: BehaviorSubject<Article> = new BehaviorSubject<Article>(
    {} as Article
  );
  $comments: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);
  $selectedComment: BehaviorSubject<Comment> = new BehaviorSubject<Comment>(
    {} as Comment
  );
  get articles$(): Observable<Article[]> {
    return this.$articles.asObservable();
  }

  get selectedArticle$(): Observable<Article> {
    return this.$selectedArticle.asObservable();
  }

  createArticle(
    payload: ArticlePayload,
    onError?: (error: Error) => void,
    onSuccess?: (response: any) => void
  ) {
    const endpoint = `${this.endpoint}/`;
    return this._http
      .post<Article>(endpoint, payload, this.httpOptions)
      .subscribe(
        (article) => {
          this.$selectedArticle.next(article);
          this.snackBar.open(`Article created successfully`);
          onSuccess?.(article);
        },
        (error: Error) => {
          onError?.(error);
        }
      );
  }

  updateArticle(
    id: string,
    payload: ArticlePayload,
    onError?: (error: Error) => void,
    onSuccess?: (response: any) => void
  ) {
    const endpoint = `${this.endpoint}/${id}`;
    return this._http.put<Article>(endpoint, this.httpOptions).subscribe(
      (article) => {
        this.$selectedArticle.next(article);
        onSuccess?.(article);
      },
      (error: Error) => {
        onError?.(error);
      }
    );
  }

  uploadArticleHeaderImage(
    id: string,
    payload: Article,
    onError?: (error: Error) => void,
    onSuccess?: (response: any) => void
  ) {
    const endpoint = `${this.endpoint}/${id}/upload-header-image`;
    return this._http.put<Article>(endpoint, this.httpOptions).subscribe(
      (article) => {
        this.$selectedArticle.next(article);
        onSuccess?.(article);
      },
      (error: Error) => {
        onError?.(error);
      }
    );
  }

  getArticles(
    { page, pageSize }: PaginationParams,
    onError?: (error: Error) => void,
    onSuccess?: (response: any) => void
  ) {
    const endpoint = `${this.endpoint}/`;

    let queryParams = new HttpParams()
      .set(`page`, page)
      .append(`pageSize`, pageSize);

    const options = { ...this.httpOptions, params: queryParams };

    return this._http.get<Article[]>(endpoint, options).subscribe(
      (articles) => {
        this.$articles.next(articles);
        onSuccess?.(articles);
      },
      (error: Error) => {
        onError?.(error);
      }
    );
  }

  getArticleById(
    id: string,
    onError?: (error: Error) => void,
    onSuccess?: (response: any) => void
  ) {
    const endpoint = `${this.endpoint}/${id}`;
    return this._http.get<Article>(endpoint, this.httpOptions).subscribe(
      (article) => {
        this.$selectedArticle.next(article);
        onSuccess?.(article);
      },
      (error: Error) => {
        onError?.(error);
      }
    );
  }

  deleteArticle(
    id: string,
    onError?: (error: Error) => void,
    onSuccess?: (res: any) => void
  ) {
    const endpoint = `${this.endpoint}/${id}`;
    return this._http.delete<void>(endpoint, this.httpOptions).subscribe(
      (res) => {
        onSuccess?.(res);
      },
      (error: Error) => {
        onError?.(error);
      }
    );
  }

  createComment(
    payload: CommentPayload,
    onError?: (error: Error) => void,
    onSuccess?: (response: any) => void
  ) {
    const endpoint = `${this.endpoint}/comments`;
    return this._http.post<Comment>(endpoint, this.httpOptions).subscribe(
      (comment) => {
        this.$selectedComment.next(comment);
        onSuccess?.(comment);
      },
      (error: Error) => {
        onError?.(error);
      }
    );
  }

  getComments(
    onError?: (error: Error) => void,
    onSuccess?: (response: any) => void
  ) {
    const endpoint = `${this.endpoint}/comments`;

    return this._http.get<Comment[]>(endpoint, this.httpOptions).subscribe(
      (comments) => {
        this.$comments.next(comments);
        onSuccess?.(comments);
      },
      (error: Error) => {
        onError?.(error);
      }
    );
  }

  deleteComment(
    id: string,
    onError?: (error: Error) => void,
    onSuccess?: () => void
  ) {
    const endpoint = `${this.endpoint}/comments/${id}`;
    return this._http.delete<void>(endpoint, this.httpOptions).subscribe(
      () => {
        onSuccess?.();
      },
      (error: Error) => {
        onError?.(error);
      }
    );
  }
}
