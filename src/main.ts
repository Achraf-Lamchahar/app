import { importProvidersFrom } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";

import { routes } from "../src/app/app.routes";
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(),

    provideRouter(routes),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));

