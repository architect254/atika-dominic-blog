import { DOCUMENT } from '@angular/common';
import { Directive, OnDestroy, OnInit, inject } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Directive({
  standalone: true,
})
export abstract class PageDirective implements OnInit, OnDestroy {
  protected title = inject(Title);
  protected meta = inject(Meta);
  protected document = inject(DOCUMENT);

  $subscription$: Subscription = new Subscription();

  constructor() {}
  ngOnInit(): void {
    this.applyMetaTags();
  }

  setTitle(title: string) {
    this.title.setTitle(title);
  }

  setMeta(meta: MetaDefinition[]) {
    this.meta.addTags(meta);
  }

  applyMetaTags() {
    this.setDefaultMetaAndTitle();
    this.setTwitterCardMeta();
    this.setFacebookOpenGraphMeta();
  }

  ngOnDestroy(): void {
    if (this.$subscription$) {
      this.$subscription$.unsubscribe();
    }
  }

  abstract setDefaultMetaAndTitle(): void;
  abstract setTwitterCardMeta(): void;
  abstract setFacebookOpenGraphMeta(): void;
}
