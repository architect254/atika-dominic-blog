import { ResolveFn } from '@angular/router';

export const authorResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
