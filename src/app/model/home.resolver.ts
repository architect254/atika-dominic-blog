import { ResolveFn } from '@angular/router';

export const homeResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
