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
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Article } from '@models/article';
import { PageDirective } from '@shared/directives/page/page.directive';

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
  action!: string;
  article!: Article | null;
  articleId!: string | null;
  articleForm!: FormGroup;
  header_image = new FormControl();

  HEADER_IMAGE_UPLOAD_URL = `http://atikadominic.com/api/upload-article_image`;

  readonly keywords = signal(['Blog Article']);

  asyncPipe = inject(AsyncPipe);
  constructor(
    private _fb: FormBuilder,
    private articleService: ArticlesService,
    private announcer: LiveAnnouncer,
    private route: ActivatedRoute
  ) {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.getArticleId();
    this.getArticle();

    this.article = this.asyncPipe.transform(
      this.articleService.$selectedArticle
    );

    this.buildForm();
  }

  buildForm() {
    this.articleForm = this._fb.group({
      title: [this.article?.title, Validators.required],
      description: [this.article?.description, Validators.required],
      keywords: [this.article?.keywords, Validators.required],
      content: [this.article?.content, Validators.required],
    });
  }

  getArticleId() {
    this.$subscription$.add(
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.articleId = params.get(`id`);
        this.action = this.articleId ? `Update` : `Create`;
      })
    );
  }

  getArticle() {
    this.$subscription$.add(
      this.articleService.getArticleById(this.articleId, {
        next: (articles) => {
          console.log(`GET ARTICLE SUCCESS`, articles);
        },
        error: (err: any) => {
          console.error(`GET ARTICLES`, err);
        },
        complete: () => {
          console.info(`GET ARTICLES COMPLETE`);
        },
      })
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
      this.articleService.createArticle(
        { ...this.articleForm.value, keywords },
        {
          next: (articles) => {
            console.log(`CREATE ARTICLE SUCCESS`, articles);
          },
          error: (err: any) => {
            console.error(`CREATE ARTICLES`, err);
          },
          complete: () => {
            console.info(`CREATE ARTICLES COMPLETE`);
          },
        }
      )
    );
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
