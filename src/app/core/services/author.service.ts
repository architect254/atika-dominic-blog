import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Author, AuthorPayload } from '@models/author';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService extends APIService {
  protected override endpoint: string = `${this.BASE_URL}`;

  $author: BehaviorSubject<Author | null> = new BehaviorSubject<Author | null>(
    null
  );

  constructor() {
    super();
  }

  get author$() {
    return this.$author.asObservable();
  }

  getAuthor(
    onError?: (error: Error) => void,
    onSuccess?: (response: any) => void
  ) {
    this.$subscriptions$.add(
      this._http.get<Author>(this.endpoint, this.httpOptions).subscribe(
        (author) => {
          this.$author.next(author);
          onSuccess?.(author);
        },
        (error) => {
          onError?.(error);
        }
      )
    );
  }

  setAuthor(
    author: AuthorPayload,
    onError?: (error: Error) => void,
    onSuccess?: (response: any) => void
  ) {
    this.$subscriptions$.add(
      this._http.post(this.endpoint, author, this.httpOptions).subscribe(
        (res) => {
          onSuccess?.(res);
        },
        (error) => {
          onError?.(error);
        }
      )
    );
  }
}
