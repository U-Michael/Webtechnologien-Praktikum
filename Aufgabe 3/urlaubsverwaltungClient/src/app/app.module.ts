import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AntraegeComponent } from  './pages/antraege/antraege.component';
import { UrlaubsantragService } from './services/UrlaubsantragService.service';
import { LoginService } from './services/LoginService.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        AntraegeComponent
    ],
    providers: [ UrlaubsantragService, LoginService ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
}
