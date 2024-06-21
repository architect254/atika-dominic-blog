import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { Observable } from 'rxjs';

import { GridContainerDirective } from '@shared/directives/grid-container/grid-container.directive';

import { ArticlesService } from '@core/services/articles.service';

import { DashboardComponent } from '@feature/dashboard/dashboard.component';
import { GridComponent } from '@feature/grid/grid.component';
import { CardComponent } from '@feature/card/card.component';


import { Article } from '@models/article';

@Component({
  selector: 'adb-blogs',
  standalone: true,
  imports: [
    ScrollingModule,
    DashboardComponent,
    GridComponent,
    CardComponent,
    AsyncPipe,
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent extends GridContainerDirective {
  articles$: Observable<Article[]> = this._articlesService.articles$;

  constructor(private _articlesService: ArticlesService) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this._articlesService.getArticles();
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
