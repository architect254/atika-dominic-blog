import { Component } from '@angular/core';

import { ArticlesService } from '@core/services/articles.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Article } from '@models/article';
import { PageDirective } from '@shared/directives/page/page.directive';

@Component({
  selector: 'adb-view-article',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './view-article.component.html',
  styleUrl: './view-article.component.scss',
})
export class ViewArticleComponent extends PageDirective {
  article$!: Observable<Article | null>;
  constructor(
    private articleService: ArticlesService,
    private route: ActivatedRoute
  ) {
    super();
    this.article$ = this.articleService.selectedArticle$;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.getArticle();
  }

  getArticle() {
    this.$subscription$.add(
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.articleService.getArticleById(params.get(`id`) ?? ``, {
          next: (articles) => {
            console.log(`GET ARTICLE SUCCESS`, articles);
          },
          error: (err: any) => {
            console.error(`GET ARTICLES`, err);
          },
          complete: () => {
            console.info(`GET ARTICLES COMPLETE`);
          },
        });
      })
    );
  }
  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
