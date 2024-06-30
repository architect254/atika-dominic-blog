import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { AuthorPayload } from '@models/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthorService extends APIService {
  protected override endpoint: string = `${this.BASE_URL}`;

  constructor() {
    super();
  }

  getAuthor(
    onSuccess: (response: any) => void,
    onError: (error: Error) => void
  ) {
    const endpoint = `${this.endpoint}`;
    this.$subscriptions$.add(
      this._http.get(endpoint, this.httpOptions).subscribe(
        (res) => {
          onSuccess(res);
        },
        (error) => {
          onError(error);
        }
      )
    );
  }

  setAuthor(
    author: AuthorPayload,
    onSuccess: (response: any) => void,
    onError: (error: Error) => void
  ) {
    const endpoint = `${this.endpoint}/${author.id ?? ''}`;
    this.$subscriptions$.add(
      this._http.post(endpoint, author, this.httpOptions).subscribe(
        (res) => {
          onSuccess(res);
        },
        (error) => {
          onError(error);
        }
      )
    );
  }
}
