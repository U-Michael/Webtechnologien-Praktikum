import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './pages/login/login.component';
import { WebshopServer } from './services/webshopServer.service';
import { WarenkorbComponent } from './pages/warenkorb/warenkorb.component';
import { KasseComponent } from './pages/kasse/kasse.component';
import { ArtikellisteComponent } from './pages/artikelliste/artikelliste.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ArtikelService } from './services/artikelService.service';

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
        WarenkorbComponent,
        KasseComponent,
        ArtikellisteComponent,
        NavigationComponent
    ],
    providers: [ WebshopServer, ArtikelService ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
}