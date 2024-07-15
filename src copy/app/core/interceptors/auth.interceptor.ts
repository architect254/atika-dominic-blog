import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const whiteListedUrls = [
    `sign-up`, `sign-in`
  ];

  const authService = inject(AuthService);

    return authService.token$.pipe(
      switchMap((token) => {
        const isApiUrl = req.url.startsWith(`/api`);

        if (token && !whiteListedUrls.includes(req.url)) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        return next(req);
      })
    );
  }
