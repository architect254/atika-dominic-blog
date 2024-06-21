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
  readonly BASE_URL = `API`;

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
          (err: Error) => {
            this.snackBar.open(`Error`, undefined, {
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
