import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { AuthorService } from '@core/services/author.service';
import { Author } from '@models/author';

import { GridContainerDirective } from '@shared/directives/grid-container/grid-container.directive';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'adb-home',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends GridContainerDirective {
  author$!: Observable<Author | null>;
  constructor(private route: ActivatedRoute) {
    super();
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.getAuthor();
  }

  getAuthor() {
    this.author$ = this.route.data.pipe(
      map((data: Data) => data['author'] as Author)
    );
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
