import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Author, AuthorPayload } from '@models/author';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService extends APIService {
  protected override endpoint: string = `${this.BASE_URL}`;

  constructor() {
    super();
  }

  getAuthor() {
    return this._http.get<Author | null>(this.endpoint, this.httpOptions);
  }

  setAuthor(author: AuthorPayload) {
    return this._http.post(this.endpoint, author, this.httpOptions);
  }
}
