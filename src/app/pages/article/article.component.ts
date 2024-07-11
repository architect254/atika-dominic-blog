import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FileUploadModule } from 'ng2-file-upload';

import { MatInputModule } from '@angular/material/input';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { ArticlesService } from '@core/services/articles.service';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Article } from '@models/article';
import { PageDirective } from '@shared/directives/page/page.directive';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'adb-article',
  standalone: true,
  imports: [
    CommonModule,
    EditorModule,
    FileUploadModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatButtonModule,
    AsyncPipe,
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent extends PageDirective {
  action: string = ``;

  $article!: Observable<Article>;

  articleForm!: FormGroup;
  header_image = new FormControl();

  HEADER_IMAGE_UPLOAD_URL = `http://atikadominic.com/api/upload-article_image`;

  readonly keywords = signal(['Blog Article']);

  asyncPipe = inject(AsyncPipe);
  constructor(
    private _fb: FormBuilder,
    private articleService: ArticlesService,
    private announcer: LiveAnnouncer,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.getArticle();
    this.buildForm();
  }

  buildForm() {
    this.articleForm = this._fb.group({
      title: [``, Validators.required],
      description: [``, Validators.required],
      keywords: [``, Validators.required],
      content: [``, Validators.required],
    });

    this.articleForm.patchValue(this.asyncPipe.transform(this.$article) ?? {});
  }

  getArticle() {
    this.$article = this.route.data.pipe(
      map((data: Data) => data['article'] as Article)
    );
  }

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
    this.createArticle();
  }

  createArticle() {
    const keywords = (this.articleForm.value.keywords as string[])
      .map((keyword, index) => {
        return `${keyword}${
          index < this.articleForm.value.keywords.length - 1 ? ', ' : ''
        }`;
      })
      .reduce((prev, curr) => {
        return prev + curr;
      });

    this.$subscription$.add(
      this.articleService
        .createArticle({ ...this.articleForm.value, keywords })
        .subscribe({
          next: (article) => {
            this.router.navigate(['/', article.id]);
          },
          error: (err: any) => {
            console.error(`CREATE ARTICLES`, err);
          },
          complete: () => {
            console.info(`CREATE ARTICLES COMPLETE`);
          },
        })
    );
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
