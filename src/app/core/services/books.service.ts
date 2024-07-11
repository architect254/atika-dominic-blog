import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable, Observer, tap } from 'rxjs';

import { Book, BookPayload } from '@models/book';

import { CommentPayload } from '@models/comment';
import { PaginationParams } from '@models/constants';

import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BooksService extends APIService {
  protected override endpoint: string = `${this.BASE_URL}/books`;

  $books: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  $selectedBook: BehaviorSubject<Book | null> =
    new BehaviorSubject<Book | null>(null);

  $comments: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);
  $selectedComment: BehaviorSubject<Comment | null> =
    new BehaviorSubject<Comment | null>(null);

  constructor() {
    super();
  }

  get books$(): Observable<Book[]> {
    return this.$books.asObservable();
  }

  get selectedBook$(): Observable<Book | null> {
    return this.$selectedBook.asObservable();
  }

  createBook(payload: BookPayload) {
    const endpoint = `${this.endpoint}`;
    return this._http.post<Book>(endpoint, payload, this.httpOptions);
  }

  updateBook(id: string, payload: BookPayload) {
    const endpoint = `${this.endpoint}/${id}`;
    return this._http.put<Book>(endpoint, payload, this.httpOptions);
  }

  uploadBookHeaderImage(id: string, payload: Book) {
    const endpoint = `${this.endpoint}/${id}/upload-header-image`;
    return this._http.put<Book>(endpoint, this.httpOptions).pipe(
      tap({
        next: (book) => {
          this.$selectedBook.next(book);
        },
        error: (err: any) => {
          this.$selectedBook.next(null);
        },
        complete: () => {
          console.info(`GET ARTICLES COMPLETE`);
        },
      })
    );
  }

  getInitialBooks() {
    return this.getBooks({ page: 1, pageSize: 100 });
  }

  getBooks(pagination: PaginationParams) {
    const { page, pageSize } = pagination;
    const endpoint = `${this.endpoint}`;

    let params = new HttpParams()
      .set(`page`, page)
      .append(`pageSize`, pageSize);

    const options = { ...this.httpOptions, params };

    return this._http.get<Book[]>(endpoint, options).pipe(
      tap({
        next: (books) => {
          this.$books.next(books);
        },
        error: (err: any) => {
          this.$books.next([]);
        },
        complete: () => {
          console.info(`GET ARTICLES COMPLETE`);
        },
      })
    );
  }

  getBookById(id: string | null) {
    const endpoint = `${this.endpoint}/${id}`;
    return this._http.get<Book>(endpoint, this.httpOptions).pipe(
      tap({
        next: (book) => {
          this.$selectedBook.next(book);
        },
        error: (err: any) => {
          this.$selectedBook.next(null);
        },
        complete: () => {
          console.info(`GET ARTICLES COMPLETE`);
        },
      })
    );
  }

  deleteBook(id: string) {
    const endpoint = `${this.endpoint}/${id}`;
    console.log(`DELETE ARTICLE 1`);

    return this._http.delete<void>(endpoint, this.httpOptions);
  }

  createComment(payload: CommentPayload) {
    const endpoint = `${this.endpoint}/comments`;
    return this._http.post<Comment>(endpoint, this.httpOptions);
  }

  getComments() {
    const endpoint = `${this.endpoint}/comments`;

    return this._http.get<Comment[]>(endpoint, this.httpOptions);
  }

  deleteComment(id: string) {
    const endpoint = `${this.endpoint}/comments/${id}`;
    return this._http.delete<void>(endpoint, this.httpOptions);
  }
}
