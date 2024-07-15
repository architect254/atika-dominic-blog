import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { Book } from '@models/book';
import { BooksService } from '@core/services/books.service';

export const bookResolver: ResolveFn<Book> = (route, state) => {
  const bookId = route.paramMap.get('id');
  return inject(BooksService).getBookById(bookId);
};

export const booksResolver: ResolveFn<Book[]> = (route, state) => {
  console.log(`RESOLVE END`)
  return inject(BooksService).getInitialBooks();
};
