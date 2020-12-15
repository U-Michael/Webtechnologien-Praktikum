import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { WarenkorbComponent } from './pages/warenkorb/warenkorb.component';
import { KasseComponent } from './pages/kasse/kasse.component';
import { ArtikellisteComponent } from './pages/artikelliste/artikelliste.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'artikelliste', component: ArtikellisteComponent },
    { path: 'warenkorb', component: WarenkorbComponent },
    { path: 'kasse', component: KasseComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }