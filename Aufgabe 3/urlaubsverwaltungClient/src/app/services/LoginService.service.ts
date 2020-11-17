import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Urlaubsantrag } from '../models/Urlaubsantrag';
import { Benutzer } from '../models/Benutzer';
import { Mitarbeiter } from '../models/Mitarbeiter';

@Injectable()
export class LoginService {
    // Achtung: '/rest' ist wichtig für die Umleitung an den Apache-Server!
    // der Rest des Pfades kann variieren...
    private uri = '/rest/urlaubsantragServer/';
    private aktuellerBenutzer: Benutzer = null;
    private aktuellerMitarbeiter: Mitarbeiter = null;

    public constructor(private httpClient: HttpClient) {
    }

    /**
     * Ruft den Server auf: POST login mit dem JSON-Benutzerobjekt als Parameter.
     * Liefert das aktuelle Benutzerobjekt (mit MitarbeiterID) im Erfolgsfall zurück.
     * @param benutzername 
     * @param passwort 
     */
    public pruefeLogin(benutzername: string, passwort: string): Promise<void | Benutzer> {
            return this.httpClient.post(this.uri + 'login', new Benutzer(-1, benutzername, passwort, -1))
            .toPromise()
            .then(benutzer => { 
                this.aktuellerBenutzer = benutzer as Benutzer;
                return this.aktuellerBenutzer; 
            })
            .catch(this.handleError);
    }
    
    public getAktuellerMitarbeiter(): Mitarbeiter {
        return this.aktuellerMitarbeiter;
    }
    
    public setAktuellerMitarbeiter(mitarbeiter: Mitarbeiter) {
        this.aktuellerMitarbeiter = mitarbeiter;
    }

    public getAktuellerBenutzer(): Benutzer {
        return this.aktuellerBenutzer;
    }

    private handleError(error: any): Promise<any> {
        console.log('Interner Fehler: ' + error.message);
        return Promise.reject(error.message || error);
    }
}
