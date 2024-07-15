import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { AuthorService } from '@core/services/author.service';
import { Author } from '@models/author';

export const authorResolver: ResolveFn<Author | null> = (route, state) => {
  return inject(AuthorService).getAuthor();
};
