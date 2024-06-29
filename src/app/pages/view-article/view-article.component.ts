import { Component } from '@angular/core';

import { ArticlesService } from '@core/services/articles.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Article } from '@models/article';

@Component({
  selector: 'adb-view-article',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './view-article.component.html',
  styleUrl: './view-article.component.scss',
})
export class ViewArticleComponent {
  article$: Observable<Article> = this.articleService.selectedArticle$;
  constructor(
    private articleService: ArticlesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.articleService.$subscriptions$.add(
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.articleService.getArticleById(params.get(`id`) ?? ``);
      })
    );
  }
}
