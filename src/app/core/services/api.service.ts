import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService implements OnDestroy {
  readonly #API_URL = `http://atikadominic.com`;
  readonly BASE_URL = `${this.#API_URL}/api`;

  protected endpoint = `${this.BASE_URL}`;

  protected _http = inject(HttpClient);
  protected snackBar = inject(MatSnackBar);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  $subscriptions$: Subscription = new Subscription();

  constructor() {}

  ngOnDestroy(): void {
    if (this.$subscriptions$) {
      this.$subscriptions$.unsubscribe();
    }
  }
}
