import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  NgZone,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SwUpdate } from '@angular/service-worker';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { first, Observable } from 'rxjs';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppShellComponent } from '@shared/components/app-shell/app-shell.component';
import { PageDirective } from '@shared/directives/page/page.directive';
import { Meta, Title } from '@angular/platform-browser';
import { LoadingService } from '@core/services/loading.service';
import { AsyncPipe } from '@angular/common';

export const API_URL = new InjectionToken<string>(`API_URL`);

@Component({
  selector: 'adb-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    ScrollingModule,
    MatSnackBarModule,
    MatProgressBarModule,
    AppShellComponent,
    AsyncPipe,
  ],
  providers: [
    JwtHelperService,
    AsyncPipe,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: API_URL, useValue: `http://atikadominic.com` },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends PageDirective {
  isLoading$!: Observable<boolean>;

  constructor(
    appRef: ApplicationRef,
    zone: NgZone,
    private swUpdate: SwUpdate,
    private loadingService: LoadingService
  ) {
    super();
    this.isLoading$ = this.loadingService.isLoading$;
    this.$subscription$.add(
      appRef.isStable.pipe(first((stable) => stable)).subscribe((t) =>
        zone.run(() => {
          this.checkForNewVersion();

          // Check for new version every minute
          setInterval(() => this.checkForNewVersion(), 60 * 1000);
        })
      )
    );
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  checkForNewVersion = async () => {
    try {
      // Check if Service Worker is supported by the Browser
      if (this.swUpdate.isEnabled) {
        // Check if new version is available
        const isNewVersion = await this.swUpdate.checkForUpdate();
        if (isNewVersion) {
          // Check if new version is activated
          const isNewVersionActivated = await this.swUpdate.activateUpdate();

          // Reload the application with new version if new version is activated
          if (isNewVersionActivated) window.location.reload();
        }
      }
    } catch (error) {
      console.error(
        `Service Worker - Error when checking for new version of the application: `,
        error
      );
      window.location.reload();
    }
  };
  override setTwitterCardMeta(): void {
    this.setMeta([
      {
        name: `twitter:title`,
        content: `@LoremIpsum`,
      },
      {
        name: `twitter:description`,
        content: `@LoremIpsum`,
      },
      {
        name: `twitter:card`,
        content: `@LoremIpsum`,
      },
      {
        name: `twitter:image`,
        content: `@LoremIpsum`,
      },
      {
        name: `twitter:site`,
        content: `https://www.atikadominic.com`,
      },
      {
        name: `twitter:creator`,
        content: `Atika Dominic`,
      },
    ]);
  }

  override setFacebookOpenGraphMeta(): void {
    this.setMeta([
      {
        name: `og:type`,
        content: `website`,
      },
      {
        name: `og:title`,
        content: `@LoremIpsum`,
      },
      {
        name: `og:description`,
        content: `@LoremIpsum`,
      },
      {
        name: `og:url`,
        content: `https://www.atikadominic.com`,
      },
      {
        name: `og:site_name`,
        content: `Atika Dominic`,
      },
      {
        name: `og:locale`,
        content: `en_US`,
      },
      {
        name: `og:image`,
        content: `@LoremIpsum`,
      },
      {
        name: `og:image:type`,
        content: `image/png`,
      },
      {
        name: `og:image:width`,
        content: `1360`,
      },
      {
        name: `og:image:height`,
        content: `720`,
      },
      {
        name: `og:image:secure_url`,
        content: `@LoremIpsum`,
      },
    ]);
  }

  override setDefaultMetaAndTitle(): void {
    this.setTitle(`Atika Dominic - Blog`);
    this.setMeta([
      {
        name: `description`,
        content: `@LoremIpsum`,
      },
      {
        name: `keywords`,
        content: `@LoremIpsum`,
      },
    ]);
  }
}
