import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { GridContainerDirective } from '@shared/directives/grid-container/grid-container.directive';
import { ActivatedRoute, Data } from '@angular/router';
import { AuthorService } from '@core/services/author.service';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { Author, AuthorPayload } from '@models/author';

@Component({
  selector: 'adb-author-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.scss',
})
export class AuthorDetailsComponent extends GridContainerDirective {
  author$!: Observable<Author | null>;
  authorForm!: FormGroup;

  fileToUpload: File | null = null;
  fileName: string = ``;
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  progress: number = 0;

  imageHash = `profile_image-${Date.now()}`;

  asyncPipe = inject(AsyncPipe);

  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private http: HttpClient
  ) {
    super();
    this.getAuthor();
  }

  onFileSelected(event: any) {
    this.fileToUpload = event?.target?.files[0];

    if (this.fileToUpload) {
      this.status = 'initial';
    }
  }

  uploadProfileImage() {
    if (this.fileToUpload) {
      this.fileName =
        this.imageHash +
        '.' +
        this.fileToUpload.name.split('?')[0].split('.').pop();

      const formData = new FormData();

      formData.append('profile_image', this.fileToUpload, this.fileName);

      const upload$ = this.http.post(
        'http://atikadominic.com/api/upload-profile_image',
        formData,
        {
          reportProgress: true,
          observe: 'events',
        }
      );

      this.status = 'uploading';
      this.$subscription$.add(
        upload$.subscribe({
          next: (event: HttpEvent<any>) => {
            if (event.type === HttpEventType.UploadProgress && event.total) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event.type === HttpEventType.Response) {
              this.status = 'success';
              event.body;
            }
          },
          error: (error: any) => {
            this.status = 'fail';
            return throwError(() => error);
          },
        })
      );
    }
  }

  submit() {
    this.uploadProfileImage();
    this.setAuthorDetails();
  }

  setAuthorDetails() {
    this.$subscription$.add(
      this.authorService
        .setAuthor({
          ...this.authorForm.value,
          profile_image: this.fileName,
        } as AuthorPayload)
        .subscribe({ next() {}, error() {} })
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getAuthor();
    this.buildAuthorForm();
  }
  buildAuthorForm() {
    this.authorForm = this._fb.group({
      nickname: ['', Validators.required],
      education: ['', Validators.required],
      interests: ['', Validators.required],
      accomplishments: ['', Validators.required],
      expertise: ['', Validators.required],
      residence: ['', Validators.required],
      about_info: ['', Validators.required],
      facebook_profile: ['', Validators.required],
      twitter_profile: ['', Validators.required],
      whatsapp_profile: ['', Validators.required],
    });

    this.authorForm.patchValue(this.asyncPipe.transform(this.author$) ?? {});
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
