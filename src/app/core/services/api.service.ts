import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, OnDestroy, inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService implements OnDestroy {
  readonly #END_POINT = `http://127.0.0.1:4200`;
  readonly BASE_URL = `${this.#END_POINT}/api`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  $subscriptions$: Subscription = new Subscription();

  snackBar = inject(MatSnackBar);

  constructor(public _http: HttpClient) {}

  pingAPI() {
    this.$subscriptions$.add(
      this._http
        .get(this.BASE_URL, this.httpOptions)
        .pipe(catchError(this.errorHandler))
        .subscribe(
          (res) => {
            this.snackBar.open(`API Pinged`, undefined, {
              panelClass: `danger`,
            });
          },
          (error: Error) => {
            this.snackBar.open(error.toString(), undefined, {
              panelClass: `danger`,
            });
          }
        )
    );
  }

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
