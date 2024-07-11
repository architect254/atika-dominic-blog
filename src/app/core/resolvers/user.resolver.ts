import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { User } from '@models/user';

export const userResolver: ResolveFn<User | null> = (route, state) => {
  return inject(AuthService).user$;
};

export const authResolver: ResolveFn<boolean> = (route, state) => {
  return inject(AuthService).isAuthenticated$;
};
