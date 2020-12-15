import { Injectable } from '@angular/core';

import { Artikel } from '../models/Artikel';
import { WebshopServer } from './webshopServer.service';

@Injectable()
/**
 * Service für den vereinfachten Zugriff auf Artikeldaten.
 * Die Artikelliste wird als Map verwaltet, welches einen Artikel anhand seiner Id findet.
 */
export class ArtikelService {
    private artikelMap: Artikel[];

    public constructor(private server: WebshopServer) {
        this.artikelMap = [];
        // Map aufbauen zum Zugriff auf Artikel über ID
     
        this.server.ladeAlleArtikel().then(artikelliste => {
            for(const a of artikelliste){
                this.artikelMap[a.id] = a;
            }
        });
    }

    public artikelZuId(id: number): Artikel {
        return this.artikelMap[id];
    }

    public artikelPreis(artikelId: number): number {
        const artikel = this.artikelMap[artikelId];
        return artikel.preis;
    }

    public artikelProperty(artikelId: number, propertyName: string): string {
        let result = '';
        if (this.artikelMap[artikelId] !== undefined) {
            result = String(this.artikelMap[artikelId][propertyName]);
        } else {
            console.log('artikelProperty: invalid property ' + propertyName);
        }
        return result;
    }
}