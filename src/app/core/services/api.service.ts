import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, OnDestroy, inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService implements OnDestroy {
  readonly #API_URL = `http://atikadominic.com`;
  readonly BASE_URL = `${this.#API_URL}/api`;

  protected endpoint = `${this.BASE_URL}`;

  protected _http = inject(HttpClient);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  $subscriptions$: Subscription = new Subscription();

  snackBar = inject(MatSnackBar);

  constructor() {}

  errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof HttpErrorResponse) {
      // Get server-side error
      errorMessage = `${error.status} - ${error.statusText || ''}: ${
        error.message
      }`;
    } else {
      // Get client-side error
      errorMessage = error.error.message;
    }
    return throwError(() => errorMessage);
  }

  ngOnDestroy(): void {
    if (this.$subscriptions$) {
      this.$subscriptions$.unsubscribe();
    }
  }
}
