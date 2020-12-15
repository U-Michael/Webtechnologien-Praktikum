import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { NgForm } from '@angular/forms';
import { WebshopServer } from '../../services/webshopServer.service';
import { Kunde } from '../../models/Kunde';
import { Warenkorb } from '../../models/Warenkorb';
import { WarenkorbPosition } from '../../models/WarenkorbPosition';
import { Artikel } from '../../models/Artikel';
import { ArtikelService } from 'src/app/services/artikelService.service';

@Component({
    selector: 'app-warenkorb',
    templateUrl: './warenkorb.component.html',
    styleUrls: ['./warenkorb.component.css']
})

/**
 * TS-Klasse für das Warenkorb-Template.
 * Besonderheiten: 
 * - neben der "menge" pro Position wird "mengeNeu" eingeführt, welches die editierte Menge enthält.
 *   Beim Speichern wird menge := mengeNeu gesetzt.
 */
export class WarenkorbComponent implements OnInit {
    public kunde: Kunde;
    public warenkorb: Warenkorb;
    public artikel: Artikel;

    public constructor(private server: WebshopServer, private artikelService: ArtikelService,
            private route: ActivatedRoute, private router: Router) {
    }

    public async ngOnInit(): Promise<void> {
        console.log(this.server.aktuellerKunde);
        this.kunde = this.server.aktuellerKunde;
        this.warenkorb = await this.server.ladeWarenkorbZuKunde(this.kunde.id)
        // Attribut "mengeNeu" zu jeder Position ergänzen, alter Wert ist in "menge"
        this.warenkorb.positionen.forEach(position => {
            position.mengeNeu = position.menge;
        });
        this.artikel = new Artikel(1, "", "", 1.0);
    }

    public preisZuPosition(p: WarenkorbPosition): number {
        return this.artikelService.artikelPreis(p.artikelId) * p.mengeNeu;
    }

    public gesamtpreis(): number {
        let gesamt = 0;

        for (const pos of this.warenkorb.positionen) {
            gesamt += this.artikelService.artikelPreis(pos.artikelId) * pos.mengeNeu;
        }

        return gesamt;
    }

    public neuerPreis(position: WarenkorbPosition): void {
        if (position.mengeNeu <= 0) {
            position.mengeNeu = position.menge;
        } else {
            position.menge = position.mengeNeu;
            this.server.speichereWarenkorb(this.warenkorb);
        }
    }

    public loeschePosition(index: number) {
        this.warenkorb.positionen.splice(index, 1);
        this.server.speichereWarenkorb(this.warenkorb);
    }

    public gibArtikelDetails(artikelId: number): void {
        this.artikel = this.artikelService.artikelZuId(artikelId);
    }
}