import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Benutzer } from '../../models/Benutzer';
import { WebshopServer } from '../../services/webshopServer.service';
import {Kunde } from '../../models/Kunde';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    public benutzer: Benutzer;
    public fehlermeldung: string;

    public constructor(public server: WebshopServer, public router: Router) {
    }

    public ngOnInit(): void {
        this.benutzer = new Benutzer('Hugo', '123');
    }

    public async login(): Promise<void> {
 
        const kunde: Kunde | null = await this.server.login(this.benutzer);
        if(kunde != null){
            this.router.navigate(['/artikelliste']);
        } else {
            this.fehlermeldung = 'Ungültiges Benutzername/Passwort';
        }
    }

    public keyup(): void {
        this.fehlermeldung = '';
    }
}