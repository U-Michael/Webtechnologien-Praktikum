import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { Router }            from '@angular/router';
import { Form } from '@angular/forms';
import { LoginService } from 'src/app/services/LoginService.service';
import { Benutzer } from 'src/app/models/Benutzer';
import { UrlaubsantragService } from 'src/app/services/UrlaubsantragService.service';
import { Mitarbeiter } from 'src/app/models/Mitarbeiter';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public benutzername: string;
    public passwort: string;
    public message: string;

    public constructor(private router: Router, private loginService: LoginService, 
            private urlaubsantragService: UrlaubsantragService) {
        this.message = 'Bitte geben Sie Benutzername und Passwort ein.';
    }

    public login(form: Form): void {
        this.loginService.pruefeLogin(this.benutzername, this.passwort)
        .then((benutzer: Benutzer) => {
            this.urlaubsantragService.gibMitarbeiterZuId(benutzer.mitarbeiterId)
            .then((mitarbeiter: Mitarbeiter) => {
                this.loginService.setAktuellerMitarbeiter(mitarbeiter);
                this.router.navigate(['/antraege']);
            })
            .catch(() => alert('Fehler beim Laden des Mitarbeiters!'));
        })
        .catch(() => {
            this.message = 'Ungültige Benutzername/Passwort-Kombination'
        });
    }
}
