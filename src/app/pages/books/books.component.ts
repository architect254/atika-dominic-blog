import { AsyncPipe, DOCUMENT, JsonPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { map, Observable, of } from 'rxjs';

import { GridContainerDirective } from '@shared/directives/grid-container/grid-container.directive';

import { BooksService } from '@core/services/books.service';

import { GridComponent } from '@feature/grid/grid.component';
import { CardComponent } from '@feature/card/card.component';

import { Book } from '@models/book';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'adb-books',
  standalone: true,
  imports: [
    ScrollingModule,
    GridComponent,
    CardComponent,
    AsyncPipe,
    JsonPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent extends GridContainerDirective {
  books$!: Observable<Book[]>;
  isAuthenticated$!: Observable<boolean>;

  constructor(
    private _booksService: BooksService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  getInitialBooks() {
    this.books$ = this.route.data.pipe(map((data) => data[`books`]));
  }

  getBooks() {
    this.books$ = this._booksService.getBooks({
      page: 1,
      pageSize: 100,
    });
  }

  createBook() {
    this.router.navigate(['books', 'create']);
  }

  editBook(id: string) {
    this.router.navigate(['books', id]);
  }

  onDelete(id: string) {
    console.log(`DELETE ARTICLE`);
    this.$subscription$.add(
      this._booksService.deleteBook(id).subscribe({
        next: (books) => {
          console.log(`DELETE ARTICLE SUCCESS`, books);
          this.getBooks();
        },
        error: (err: any) => {
          console.error(`DELETE ARTICLES`, err);
        },
        complete: () => {
          console.info(`DELETE ARTICLES COMPLETE`);
        },
      })
    );
  }
  goToBook(bookId: string) {
    this.router.navigate([bookId]);
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.getInitialBooks();
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
