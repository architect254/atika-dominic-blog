import { Component } from '@angular/core';

import { GridContainerDirective } from '@shared/directives/grid-container/grid-container.directive';

@Component({
  selector: 'adb-atika-dominic',
  standalone: true,
  imports: [],
  templateUrl: './atika-dominic.component.html',
  styleUrl: './atika-dominic.component.scss',
})
export class AtikaDominicComponent extends GridContainerDirective {
  override ngOnInit(): void {
    super.ngOnInit();
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
