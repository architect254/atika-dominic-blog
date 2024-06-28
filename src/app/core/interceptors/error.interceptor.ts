import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError(errorHandler));
};

function errorHandler(error: HttpErrorResponse) {
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
  const snackBar = inject(MatSnackBar);

  snackBar.open(error.message, ``, { panelClass: `mat-danger` });

  return throwError(() => errorMessage);
}
