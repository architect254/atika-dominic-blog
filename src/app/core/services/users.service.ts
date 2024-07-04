import { Injectable } from '@angular/core';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends APIService {
  protected override endpoint: string = `${this.BASE_URL}/users`;

  constructor() {
    super();
  }

  getUsers(
    onSuccess: (response: any) => void,
    onError: (error: Error) => void
  ) {
    const endpoint = `${this.endpoint}`;
    return this._http.get(endpoint, this.httpOptions).subscribe(
      (res) => {
        onSuccess(res);
      },
      (error) => {
        onError(error);
      }
    );
  }

  getUserByID(
    id: string,
    onSuccess: (response: any) => void,
    onError: (error: Error) => void
  ) {
    const endpoint = `${this.endpoint}/${id}`;
    return this._http.get(endpoint, this.httpOptions).subscribe(
      (res) => {
        onSuccess(res);
      },
      (error) => {
        onError(error);
      }
    );
  }
}
