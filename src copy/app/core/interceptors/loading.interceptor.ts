import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let service_count = 0;
  const loadingService = inject(LoadingService);

  service_count++;
  loadingService.isLoading = true;

  return next(req).pipe(
    finalize(() => {
      service_count--;

      if (service_count === 0) {
        loadingService.isLoading = false;
      }
    })
  );
};
