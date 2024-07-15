import { AsyncPipe, CommonModule, DOCUMENT, JsonPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { map, Observable, of } from 'rxjs';

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
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

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
    CommonModule,
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
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  getInitialArticles() {
    this.articles$ = this.route.data.pipe(map((data) => data[`articles`]));
  }

  getArticles() {
    this.articles$ = this._articlesService.getArticles({
      page: 1,
      pageSize: 100,
    });
  }

  create() {
    this.router.navigate(['articles', 'create']);
  }

  edit(id: string) {
    this.router.navigate(['articles', id]);
  }

  delete(id: string) {
    console.log(`DELETE ARTICLE`);
    this.$subscription$.add(
      this._articlesService.deleteArticle(id).subscribe({
        next: (articles) => {
          console.log(`DELETE ARTICLE SUCCESS`, articles);
          this.getArticles();
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
  view(articleId: string) {
    this.router.navigate([articleId]);
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.getInitialArticles();
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
