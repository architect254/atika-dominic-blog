import { ResolveFn } from '@angular/router';

export const blogResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
