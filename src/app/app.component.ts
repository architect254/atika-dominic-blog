import { ApplicationRef, Component, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SwUpdate } from '@angular/service-worker';

import { first } from 'rxjs';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { APIService } from '@core/services/api.service';

import { AppShellComponent } from '@shared/components/app-shell/app-shell.component';
import { PageDirective } from '@shared/directives/page/page.directive';
import { ArticlesService } from '@core/services/articles.service';

@Component({
  selector: 'adb-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ScrollingModule,
    MatSnackBarModule,
    AppShellComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends PageDirective {
  constructor(
    appRef: ApplicationRef,
    zone: NgZone,
    private swUpdate: SwUpdate,
    private ApiService: APIService
  ) {
    super();
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

  override ngOnInit(): void {
    super.ngOnInit();
    this.ApiService.pingAPI();
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
