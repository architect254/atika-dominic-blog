import { Injectable } from '@angular/core';

import { Article, ArticlePayload } from 'app/models/article';

import { BehaviorSubject, Observable, catchError } from 'rxjs';

import { APIService } from './api.service';
import { CommentPayload } from '@models/comment';

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
    this.$subscriptions$.add(
      this._http.post<Article>(endpoint, this.httpOptions).subscribe(
        (article) => {
          this.$selectedArticle.next(article);
          onSuccess?.(article);
        },
        (error: Error) => {
          onError?.(error);
        }
      )
    );
  }

  updateArticle(
    id: string,
    payload: ArticlePayload,
    onError?: (error: Error) => void,
    onSuccess?: (response: any) => void
  ) {
    const endpoint = `${this.endpoint}/${id}`;
    this.$subscriptions$.add(
      this._http.put<Article>(endpoint, this.httpOptions).subscribe(
        (article) => {
          this.$selectedArticle.next(article);
          onSuccess?.(article);
        },
        (error: Error) => {
          onError?.(error);
        }
      )
    );
  }

  uploadArticleHeaderImage(
    id: string,
    payload: Article,
    onError?: (error: Error) => void,
    onSuccess?: (response: any) => void
  ) {
    const endpoint = `${this.endpoint}/${id}/upload-header-image`;
    this.$subscriptions$.add(
      this._http.put<Article>(endpoint, this.httpOptions).subscribe(
        (article) => {
          this.$selectedArticle.next(article);
          onSuccess?.(article);
        },
        (error: Error) => {
          onError?.(error);
        }
      )
    );
  }

  getArticles(
    onError?: (error: Error) => void,
    onSuccess?: (response: any) => void
  ): void {
    const endpoint = `${this.endpoint}/`;

    this.$subscriptions$.add(
      this._http.get<Article[]>(endpoint, this.httpOptions).subscribe(
        (articles) => {
          this.$articles.next(articles);
          onSuccess?.(articles);
        },
        (error: Error) => {
          onError?.(error);
        }
      )
    );
  }

  getArticleById(
    id: string,
    onError?: (error: Error) => void,
    onSuccess?: (response: any) => void
  ): void {
    const endpoint = `${this.endpoint}/${id}`;
    this.$subscriptions$.add(
      this._http.get<Article>(endpoint, this.httpOptions).subscribe(
        (article) => {
          this.$selectedArticle.next(article);
          onSuccess?.(article);
        },
        (error: Error) => {
          onError?.(error);
        }
      )
    );
  }

  deleteArticle(
    id: string,
    onError?: (error: Error) => void,
    onSuccess?: () => void
  ) {
    const endpoint = `${this.endpoint}/${id}`;
    this.$subscriptions$.add(
      this._http.delete<void>(endpoint, this.httpOptions).subscribe(
        () => {
          onSuccess?.();
        },
        (error: Error) => {
          onError?.(error);
        }
      )
    );
  }

  createComment(
    payload: CommentPayload,
    onError?: (error: Error) => void,
    onSuccess?: (response: any) => void
  ) {
    const endpoint = `${this.endpoint}/comments`;
    this.$subscriptions$.add(
      this._http.post<Comment>(endpoint, this.httpOptions).subscribe(
        (comment) => {
          this.$selectedComment.next(comment);
          onSuccess?.(comment);
        },
        (error: Error) => {
          onError?.(error);
        }
      )
    );
  }

  getComments(
    onError?: (error: Error) => void,
    onSuccess?: (response: any) => void
  ): void {
    const endpoint = `${this.endpoint}/comments`;

    this.$subscriptions$.add(
      this._http.get<Comment[]>(endpoint, this.httpOptions).subscribe(
        (comments) => {
          this.$comments.next(comments);
          onSuccess?.(comments);
        },
        (error: Error) => {
          onError?.(error);
        }
      )
    );
  }

  deleteComment(
    id: string,
    onError?: (error: Error) => void,
    onSuccess?: () => void
  ) {
    const endpoint = `${this.endpoint}/comments/${id}`;
    this.$subscriptions$.add(
      this._http.delete<void>(endpoint, this.httpOptions).subscribe(
        () => {
          onSuccess?.();
        },
        (error: Error) => {
          onError?.(error);
        }
      )
    );
  }
}
