import { Directive, Inject, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { PageDirective } from '../page/page.directive';
import { Meta, Title } from '@angular/platform-browser';

@Directive({
  standalone: true,
})
export abstract class GridContainerDirective extends PageDirective {
  gridHeight: number = 0;
  gridWidth: number = 0;

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    const toolbarHeight = this.document.getElementById('toolbar')?.offsetHeight;
    const headerHeight =
      this.document.getElementById('secondary-nav')?.offsetHeight;
    const containerWidth =
      this.document.getElementById('outlet-container')?.offsetWidth;

    if (toolbarHeight && headerHeight && containerWidth) {
      this.gridHeight = window.innerHeight - (toolbarHeight + headerHeight);
      this.gridWidth = containerWidth;
    }
  }
}
