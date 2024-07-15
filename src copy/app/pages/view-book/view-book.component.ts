import { Component } from '@angular/core';

import { ArticlesService } from '@core/services/articles.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';
import { Article } from '@models/article';
import { PageDirective } from '@shared/directives/page/page.directive';

@Component({
  selector: 'adb-view-book',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './view-book.component.html',
  styleUrl: './view-book.component.scss',
})
export class ViewBookComponent extends PageDirective {
  article$!: Observable<Article | null>;
  constructor(private route: ActivatedRoute) {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.getArticle();
  }

  getArticle() {
    this.article$ = this.route.data.pipe(map((data) => data[`article`]));
  }
  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
