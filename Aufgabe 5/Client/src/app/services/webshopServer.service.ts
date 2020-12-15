import { Injectable } from '@angular/core';

import { Benutzer } from '../models/Benutzer';
import { Warenkorb } from '../models/Warenkorb';
import { Kunde } from '../models/Kunde';
import { Artikel } from '../models/Artikel';
import { HttpClient } from '@angular/common/http';

@Injectable()
/**
 * Schnittstellenservice für den Webshop-Server. Dieser stellt Operationen für Login, Artikeldaten und Warenkorbdaten zur Verfügung.
 * 
 * Diese Implementierung simuliert den Server, indem Arrays mit Kunden, Artikel und Warenkörbe gehalten werden.
 * Die Operationen des Service greifen auf die Arrays zu.
 */
export class WebshopServer {
    /*
    private kunden: Array<Kunde> = JSON.parse(
    `[
        {
            "id": 1,
            "name": "Hugo Maier",
            "benutzername": "Hugo",
            "passwort": "123"
        },
        {
            "id": 2,
            "name": "Codie Coder",
            "benutzername": "Codie",
            "passwort": "123"
        }
    ]`);
    private artikel: Array<Artikel> = JSON.parse(
    `[
        {
            "id": 1,
            "kurzText": "Milch",
            "beschreibung": "1L H-Milch 3,5% Fett",
            "preis": "0.80"
        },
        {
            "id": 2,
            "kurzText": "Butter",
            "beschreibung": "250gr. Markenbutter",
            "preis": "1.80"
        },
        {
            "id": 3,
            "kurzText": "Essig",
            "beschreibung": "1L Balsamico-Essig",
            "preis": "2.80"
        }
    ]`);
    private warenkoerbe: Array<Warenkorb> = JSON.parse(
    `{
        "1": {
            "id": 1,
            "kundenId": 1,
            "status": "angelegt",
            "positionen": [
                {
                    "nr": 1,
                    "artikelId": 2,
                    "menge": 1
                },
                {
                    "nr": 2,
                    "artikelId": 1,
                    "menge": 8
                },
                {
                    "nr": 3,
                    "artikelId": 3,
                    "menge": 9
                }
            ]
        },
        "2": {
            "id": 2,
            "kundenId": 2,
            "status": "angelegt",
            "positionen": []
        }
    }`);*/

    public aktuellerKunde: Kunde;
    private url = "http://localhost:80/Aufgabe 5";
    public constructor(private httpClient: HttpClient){

    }

    public async login(benutzer: Benutzer): Promise<Kunde| null> {
        try{
            const res: any = await this.httpClient.post(`${this.url}/benutzer/login`, benutzer).toPromise();
            this.aktuellerKunde = new Kunde(res.id, res.name, res.benutzername, res.passwort);
            return this.aktuellerKunde;
        } catch(error){
            console.error(error);
        }
        return null;
    }

    public async ladeWarenkorbZuKunde(kundeId: number): Promise<Warenkorb> {
        const res: any = await this.httpClient.get(`${this.url}/kunde/${kundeId}/warenkorb?status=angelegt`).toPromise();
        return res;
    }

    public async ladeAlleArtikel(): Promise<Array<Artikel>> {
        const res: any = await this.httpClient.get(`${this.url}/artikel`).toPromise();
        const resultList: Array<Artikel> = new Array<Artikel>();
        res.forEach(entry => {
            resultList.push(new Artikel(entry.id, entry.kurzText, entry.beschreibung, entry.preis));
        });
        return resultList;
    }

    public async speichereWarenkorb(warenkorb: Warenkorb): Promise<void> {

        if(warenkorb.status === "bezahlt" ){
            warenkorb = new Warenkorb(warenkorb.id, warenkorb.kundenId, 'angelegt', []);
        }
         this.httpClient.put(`${this.url}/kunde/${warenkorb.kundenId}/warenkorb`,warenkorb).toPromise();
        
    }
}