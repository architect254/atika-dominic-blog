import { Injectable } from '@angular/core';

import { APIService } from './api.service';

import { SignInPayload, SignUpPayload } from '@models/auth.payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends APIService {
  protected override endpoint: string = `${this.BASE_URL}`;

  constructor() {
    super();
  }

  signUp(
    payload: SignUpPayload,
    onSuccess: (response: any) => void,
    onError: (error: Error) => void
  ) {
    const endpoint = `${this.endpoint}/sign-up`;
    this.$subscriptions$.add(
      this._http.post(endpoint, payload, this.httpOptions).subscribe(
        (res) => {
          onSuccess(res);
        },
        (error) => {
          onError(error);
        }
      )
    );
  }

  signIn(
    payload: SignInPayload,
    onSuccess: (response: any) => void,
    onError: (error: Error) => void
  ) {
    const endpoint = `${this.endpoint}/sign-in`;
    this.$subscriptions$.add(
      this._http.post(endpoint, payload, this.httpOptions).subscribe(
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
