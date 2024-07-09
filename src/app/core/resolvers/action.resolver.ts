import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

export const actionResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
