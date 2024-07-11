import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AuthorService } from '@core/services/author.service';

import { GridContainerDirective } from '@shared/directives/grid-container/grid-container.directive';

@Component({
  selector: 'adb-home',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends GridContainerDirective {
  author$ = this.authorService.author$;
  constructor(private authorService: AuthorService) {
    super();
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.getAuthor();
  }

  getAuthor() {
    this.$subscription$.add(
      this.authorService.getAuthor().subscribe({ next() {}, error() {} })
    );
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
