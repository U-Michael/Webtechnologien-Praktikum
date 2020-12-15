import { Component, OnInit } from '@angular/core';
import { WebshopServer } from 'src/app/services/webshopServer.service';
import { Kunde } from 'src/app/models/Kunde';
import { Warenkorb } from 'src/app/models/Warenkorb';
import { Artikel } from 'src/app/models/Artikel';
import { WarenkorbPosition } from 'src/app/models/WarenkorbPosition';

@Component({
  selector: 'app-artikelliste',
  templateUrl: './artikelliste.component.html',
  styleUrls: ['./artikelliste.component.css']
})
export class ArtikellisteComponent implements OnInit {
    public kunde: Kunde;
    public warenkorb: Warenkorb;
    public artikelliste: Array<Artikel>;
    // Menge an Artikeln, die in den Warenkorb gelegt werden sollen
    public anzahlen: Array<number>; 
    // Anzuzeigende Nachricht zum Artikel
    public nachricht: Array<string>;

    public constructor(private server: WebshopServer) { 
    }

    public async ngOnInit(): Promise<void> {
        this.kunde = this.server.aktuellerKunde;
        this.warenkorb = await this.server.ladeWarenkorbZuKunde(this.kunde.id);
        const artikelliste = await this.server.ladeAlleArtikel()
        this.artikelliste = artikelliste;
        this.nachricht = [];
        this.anzahlen = [];
        artikelliste.forEach(a => {
            this.anzahlen.push(1);
            this.nachricht.push('');
        });
    }

    public get artikellisteSorted(): Array<Artikel> {
        if(this.artikelliste != null){
            return this.artikelliste.sort((a1,a2) => a1.kurzText.localeCompare(a2.kurzText));
        }
        return[];
    }

    private zeigeBestaetigung(index: number): void {
        this.nachricht[index] = 'Der Artikel wurde in den Warenkorb gelegt.';
        setTimeout(() => {
            this.nachricht[index] = '';
        }, 2500);
    }

    /**
     * Lege anzahlen[index] Artikel von artikelliste[index] in den Warenkorb und speichere diesen.
     * @param index Nr des Artikels
     */
    public inWarenkorb(index: number): void {
        const artikel = this.artikelliste[index];
        let neuePosition = true;

        for (const position of this.warenkorb.positionen) {
            if (position.artikelId == artikel.id) {
                position.menge += this.anzahlen[index];
                this.zeigeBestaetigung(index);
                neuePosition = false;
                break;
            }
        }
        if (neuePosition) {
            this.warenkorb.positionen.push(
                new WarenkorbPosition(this.warenkorb.positionen.length + 1, artikel.id, artikel.kurzText, artikel.preis, this.anzahlen[index]));
            this.zeigeBestaetigung(index);
        }
        this.server.speichereWarenkorb(this.warenkorb);
    }

}