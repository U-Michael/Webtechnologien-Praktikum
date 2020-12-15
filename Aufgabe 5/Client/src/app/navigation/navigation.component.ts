import { Component, OnInit, KeyValueChangeRecord } from '@angular/core';
import { Router } from '@angular/router';

import { Kunde } from '../models/Kunde';
import { WebshopServer } from '../services/webshopServer.service';
import { Warenkorb } from '../models/Warenkorb';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

/**
 * Zeigt Buttonleiste zum Navigieren an.
 */
export class NavigationComponent implements OnInit {
    public kunde: Kunde;
    public warenkorb: Warenkorb;

    public constructor(private server: WebshopServer, private router: Router) { 
    }

    public async ngOnInit(): Promise<void> {
        this.kunde = this.server.aktuellerKunde;
        this.warenkorb = await this.server.ladeWarenkorbZuKunde(this.kunde.id);
    }

    public artikelliste(): void {
        this.router.navigate([ 'artikelliste' ]);
    }

    public kasse(): void {
        this.router.navigate([ 'kasse' ]);
    }

    public zumWarenkorb(): void {
        this.router.navigate([ 'warenkorb' ]);
    }

    public logout(): void {
        this.router.navigate([ 'login' ]);
    }

}