import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideRouter(routes),
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ]
};
