import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  Injector,
  ViewChild,
  afterNextRender,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { GridContainerDirective } from '@shared/directives/grid-container/grid-container.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '@core/services/author.service';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AuthorPayload } from '@models/author';

@Component({
  selector: 'adb-about-atika-dominic',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './about-atika-dominic.component.html',
  styleUrl: './about-atika-dominic.component.scss',
})
export class AboutAtikaDominicComponent extends GridContainerDirective {
  authorForm: FormGroup = this._fb.group({
    about_title: ['', Validators.required],
    about_description: ['', Validators.required],
    profile_image: ['', Validators.required],
    contact_title: ['', Validators.required],
    contact_description: ['', Validators.required],
    contact_email: ['', Validators.required],
    facebook_profile: ['', Validators.required],
    twitter_profile: ['', Validators.required],
    youtube_profile: ['', Validators.required],
  });

  fileToUpload: File | null = null; // Variable to store file
  fileName: string = ``;
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial'; // Variable to store file status
  progress: number = 0;

  imageHash = `profile_image-${Date.now()}`;

  constructor(
    private _fb: FormBuilder,
    private authorService: AuthorService,
    private http: HttpClient
  ) {
    super();
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
  }

  getAuthor() {
    this.$subscription$.add(
      this.authorService.getAuthor().subscribe({ next() {}, error() {} })
    );
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
