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

  getUsers() {
    const endpoint = `${this.endpoint}`;
    return this._http.get(endpoint, this.httpOptions);
  }

  getUserByID(id: string) {
    const endpoint = `${this.endpoint}/${id}`;
    return this._http.get(endpoint, this.httpOptions);
  }
}
