import { AsyncPipe, DOCUMENT, JsonPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { Observable, of } from 'rxjs';

import { GridContainerDirective } from '@shared/directives/grid-container/grid-container.directive';

import { ArticlesService } from '@core/services/articles.service';

import { GridComponent } from '@feature/grid/grid.component';
import { CardComponent } from '@feature/card/card.component';

import { Article } from '@models/article';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { APIService } from '@core/services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { error } from 'console';

@Component({
  selector: 'adb-articles',
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
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent extends GridContainerDirective {
  articles$!: Observable<Article[]>;
  isAuthenticated$!: Observable<boolean>;

  constructor(
    private _articlesService: ArticlesService,
    private authService: AuthService,
    private router: Router
  ) {
    super();
    this.articles$ = this._articlesService.articles$;
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  getArticles() {
    this.$subscription$.add(
      this._articlesService.getArticles(
        { page: 1, pageSize: 10 },
        {
          next: (articles) => {
            console.log(`GET ARTICLE SUCCESS`, articles);
          },
          error: (err: any) => {
            console.error(`GET ARTICLES`, error);
          },
          complete: () => {
            console.info(`GET ARTICLES COMPLETE`);
          },
        }
      )
    );
  }

  createArticle() {
    this.router.navigate(['articles', 'create']);
  }

  editArticle(id: string) {
    this.router.navigate(['articles', id]);
  }
  onDelete(id: string) {
    console.log(`DELETE ARTICLE`);
    this.$subscription$.add(
      this._articlesService.deleteArticle(id, {
        next: (articles) => {
          console.log(`DELETE ARTICLE SUCCESS`, articles);
          this.getArticles();
        },
        error: (err: any) => {
          console.error(`DELETE ARTICLES`, error);
        },
        complete: () => {
          console.info(`DELETE ARTICLES COMPLETE`);
        },
      })
    );
  }
  goToArticle(articleId: string) {
    this.router.navigate([articleId]);
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.getArticles();
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
