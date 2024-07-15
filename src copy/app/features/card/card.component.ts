import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Article } from 'app/models/article';
import { SlicePipe } from '@angular/common';
import { ArticlesService } from '@core/services/articles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'adb-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, SlicePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  constructor() {}
}
