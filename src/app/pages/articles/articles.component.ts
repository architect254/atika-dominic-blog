import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
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
import { User } from '@models/user';

@Component({
  selector: 'adb-articles',
  standalone: true,
  imports: [
    ScrollingModule,
    GridComponent,
    CardComponent,
    AsyncPipe,
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
  articles$: Observable<Article[]> = this._articlesService.$articles;
  user$: Observable<User | null> = this.authService.user$;
  
  constructor(
    private _articlesService: ArticlesService,
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  createArticle() {
    this.router.navigate(['create-article']);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this._articlesService.getArticles(
      (error: Error) => {},
      (response: any) => {}
    );
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
