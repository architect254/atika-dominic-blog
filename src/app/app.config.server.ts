import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { ROUTES } from '@angular/router';

import { appConfig } from './app.config';

import { AppShellComponent } from '@shared/components/app-shell/app-shell.component';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
        provide: ROUTES,
        multi: true,
        useValue: [
            {
                path: 'shell',
                component: AppShellComponent
            }
        ]
    },
    {
        provide: ROUTES,
        multi: true,
        useValue: [
            {
                path: 'shell',
                component: AppShellComponent
            }
        ]
    },
    {
        provide: ROUTES,
        multi: true,
        useValue: [
            {
                path: 'shell',
                component: AppShellComponent
            }
        ]
    }
]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
