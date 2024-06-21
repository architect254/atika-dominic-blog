import { Component, Inject, OnInit } from '@angular/core';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'adb-grid',
  standalone: true,
  imports: [ScrollingModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent implements OnInit {
  items = Array.from({ length: 10000 }).map((_, i) => `Item #${i}`);

  scrolledIndex: number = 0;

  constructor() {}

  ngOnInit(): void {}

  onScrolledIndexChange(index: any) {
    this.scrolledIndex = index;
  }
}
