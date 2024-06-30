import { Component, Inject, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';

import { MatInputModule } from '@angular/material/input';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { ArticlesService } from '@core/services/articles.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { API_URL } from 'app/app.component';
import { Article } from '@models/article';
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
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  action = ``;

  article = this.articleService.$selectedArticle.value;

  articleForm: FormGroup = this._fb.group({
    title: [this.article.title, Validators.required],
    description: [this.article.description, Validators.required],
    keywords: [this.article.keywords, Validators.required],
    content: [this.article.content, Validators.required],
  });

  readonly keywords = signal(['Blog Article']);

  header_image = new FormControl();

  HEADER_IMAGE_UPLOAD_URL = `http://atikadominic.com/api/upload-article_image`;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;

  constructor(
    private _fb: FormBuilder,
    private articleService: ArticlesService,
    private announcer: LiveAnnouncer,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.uploader = new FileUploader({
      url: this.HEADER_IMAGE_UPLOAD_URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item: any) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: `article_image-${new Date() + item._file.extname}`,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date(),
          });
        });
      },
    });

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe((res) => (this.response = res));
  }

  ngOnInit() {
    this.articleService.$subscriptions$.add(
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.action = params.get(`id`) ? `Update` : `Create`;
        this.articleService.getArticleById(
          params.get(`id`) ?? ``,
          (e) => {
            console.error(`MESSAGE`, e);
          },
          (r) => {
            console.log(`MESSAGE`, r);
          }
        );
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

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  chooseImage(uploadInpt: any) {
    uploadInpt.click();
  }

  submit() {
    this.uploader.uploadAll();
    const keywords = (this.articleForm.value.keywords as string[])
      .map((keyword, index) => {
        return `${keyword}${
          index < this.articleForm.value.keywords.length - 1 ? ', ' : ''
        }`;
      })
      .reduce((prev, curr) => {
        return prev + curr;
      });

    this.articleService.createArticle(
      { ...this.articleForm.value, keywords },
      (error: Error) => {
        console.error(`Article Error`, error);
      },
      (article: Article) => {
        this.router.navigate(['/']);
      }
    );
  }
}
