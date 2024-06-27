import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MatInputModule } from '@angular/material/input';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { ArticlesService } from '@core/services/articles.service';
import { ArticlePayload } from '@models/article';

@Component({
  selector: 'adb-create-article',
  standalone: true,
  imports: [
    EditorModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatButtonModule,
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent {
  articleForm: FormGroup = this._fb.group({
    article: ['', Validators.required],
    keywords: ['', Validators.required],
  });

  readonly keywords = signal([
    'angular',
    'how-to',
    'tutorial',
    'accessibility',
  ]);

  announcer = inject(LiveAnnouncer);

  constructor(
    private _fb: FormBuilder,
    private articleService: ArticlesService
  ) {}

  removeKeyword(keyword: string) {
    this.keywords.update((keywords) => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword}`);
      return [...keywords];
    });
    this.articleForm.get(`keywords`)?.setValue(this.keywords().toString());
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.update((keywords) => [...keywords, value]);
    }

    this.articleForm.get(`keywords`)?.setValue(this.keywords().toString());

    // Clear the input value
    event.chipInput!.clear();
  }

  submit() {
    this.articleService.createArticle(
      {
        ...this.articleForm.getRawValue(),
      } as ArticlePayload,
      (response: any) => {
        console.log(`Article Success`, response);
      },
      (error: Error) => {
        console.error(`Article Error`, error);
      }
    );
  }
}
