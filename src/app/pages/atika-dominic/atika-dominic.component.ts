import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AuthorService } from '@core/services/author.service';

import { GridContainerDirective } from '@shared/directives/grid-container/grid-container.directive';

@Component({
  selector: 'adb-atika-dominic',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './atika-dominic.component.html',
  styleUrl: './atika-dominic.component.scss',
})
export class AtikaDominicComponent extends GridContainerDirective {
  author$ = this.authorService.author$;
  constructor(private authorService: AuthorService) {
    super();
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.authorService.getAuthor(
      (e) => {
        console.error(`GET AUTHOR`, e);
      },
      (r) => {
        console.log(`GET AUTHOR`);
      }
    );
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
