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
import { AuthorPayload } from '@models/constants';
import { AuthorService } from '@core/services/author.service';

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

  fileToUpload!: FileList;
  imageHash = `profile_image-${new Date().getUTCMilliseconds()}`;

  constructor(
    private _fb: FormBuilder,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();

    const fileName = `${this.imageHash}.${this.authorForm
      .get(`profile_image`)
      ?.value.split(`.`)
      .pop()}`;

    const payload: AuthorPayload = {
      ...this.authorForm.value,
      profile_image: fileName,
    };

    this.authorService.setAuthor(
      payload,
      (r) => {
        console.log(`RRRRRR`, r);
      },
      (e) => {
        console.log(`EEEE`, e);
      }
    );
  }

  onFileSelected(event: any) {
    this.fileToUpload = event?.target?.files[0];

    console.log(`FILE SELECTED`, event);
    const selectedFile = { name: `` };

    const formData = new FormData();
    formData.append('file', new Blob(), selectedFile.name);
  }

  submit() {
    console.log(`FILE AUT`, this.authorForm.value);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.authorService.getAuthor(
      (r) => {
        console.log(`AUTHOR`);
      },
      (e) => {
        console.log(`ERROR`, e);
      }
    );
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}
}
