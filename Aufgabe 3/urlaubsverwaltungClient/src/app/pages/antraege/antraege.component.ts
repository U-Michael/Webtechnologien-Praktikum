import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router }            from '@angular/router';
import {Form} from '@angular/forms';
import { UrlaubsantragService } from 'src/app/services/UrlaubsantragService.service';
import { Urlaubsantrag } from 'src/app/models/Urlaubsantrag';
import * as moment from 'moment';
import { LoginService } from 'src/app/services/LoginService.service';
import { Benutzer } from 'src/app/models/Benutzer';
import { Mitarbeiter } from 'src/app/models/Mitarbeiter';
import { ɵangular_packages_platform_browser_platform_browser_j } from '@angular/platform-browser';
import { ResourceLoader } from '@angular/compiler';

@Component({
    selector: 'app-antraege',
    templateUrl: './antraege.component.html',
    styleUrls: ['./antraege.component.css']
})
export class AntraegeComponent implements OnInit {
    public aktuellerAntrag: Urlaubsantrag;
    public bemerkung: string;
    public benutzer: Benutzer;
    public mitarbeiter: Mitarbeiter;
    public ueberstundentage: number;
    public urlaubstage_nehmen: number;
    public ueberstundentage_nehmen: number;
    public von: string;
    public bis: string;
    public ablehnBemerkung: string;
    public ablehnId: number;

    public constructor(private router: Router, private speicherService: UrlaubsantragService, 
            private loginService: LoginService) {
        this.mitarbeiter = this.loginService.getAktuellerMitarbeiter();
        this.aktuellerAntrag = null;
        this.bemerkung = '';
        const heute = moment().format("YYYY-MM-DD");
    }

    public ngOnInit(): void {
        this.benutzer = this.loginService.getAktuellerBenutzer();
        if (this.benutzer == null) {
            this.router.navigate([ 'login' ]);
        }
    }

    public schliessen(): void {
        this.router.navigate(['login']);
    }

    /**
     * Berechnet die Anzahl Werktage zwischen von- und bis-Datum.
     * @param von 
     * @param bis 
     */
    public tage(von: string, bis: string): number {
        const vonMoment = moment(moment(von).format('YYYY-MM-DD'));
        const bisMoment = moment(moment(bis).format('YYYY-MM-DD'));
        let urlaubstage = 0;

        if(bisMoment.isBefore(vonMoment)){
            return -1;
        }

        while (true) {
            const day = vonMoment.weekday();
            if (day > 0 && day < 6) { // 0 = Sonntag, 6 = Samstag
                urlaubstage++;
            }
            if (vonMoment.isSame(bisMoment)) 
                break;
            vonMoment.add(1, 'days');
        }

        return urlaubstage;
    }

    /**
     * Schliesst den Dialog zum Stellen eines Antrags.
     */
    public antragStellenDialogSchliessen(): void {
        document.getElementById('antrag-stellen-dialog-schliessen').click();
    }

    public antraege(status: string): Array<Urlaubsantrag> {
        let result = Array<Urlaubsantrag>();

        if (this.mitarbeiter != null && this.mitarbeiter.urlaubsantraege != null) {
            this.mitarbeiter.urlaubsantraege.forEach(antrag => {
                if (antrag.status == status || status == '')
                    result.push(antrag);
            });
            result.sort((a1, a2) => {
                const m1 = moment(a1.von);
                const m2 = moment(a2.von);

                if (m1.isSame(m2)) 
                    return 0;
                if (m1.isBefore(moment(m2))) 
                    return 1;
                return -1;
            });
        }

        return result;
    }

    public antraegeMitarbeiter(status: string): Array<Urlaubsantrag> {
        const result = Array<Urlaubsantrag>();

        if (this.mitarbeiter != null && this.mitarbeiter.urlaubsantraegeMitarbeiter != null) {
            this.mitarbeiter.urlaubsantraegeMitarbeiter.forEach(antrag => {
                if (antrag.status === status || status === '') {
                    result.push(antrag);
                }
            });
            result.sort((a1, a2) => {
                const bearbeitetA1: number = a1.status !== 'unbearbeitet' ? 0 : 1;
                const bearbeitetA2: number = a2.status !== 'unbearbeitet' ? 0 : 1;

                if (bearbeitetA2 - bearbeitetA1 !== 0) {
                    return bearbeitetA2 - bearbeitetA1;
                }

                const m1 = moment(a1.von);
                const m2 = moment(a2.von);

                if (m1.isSame(m2)) {
                    return 0;
                }
                if (m1.isBefore(moment(m2))) {
                    return 1;
                }
                return -1;
            });
        }

        return result;
    }

    public neuerAntrag(form: Form):void {
        const antrag: Urlaubsantrag = new Urlaubsantrag(
            -1, this.von, this.bis, this.mitarbeiter.id, 
            this.mitarbeiter.name, moment().format('MM/DD/YYYY HH:mm:ss'),
            'unbearbeitet', '');

        this.speicherService.speichereUrlaubsantrag(antrag)
            .then(id => {
                antrag.id = id;
                this.mitarbeiter.urlaubsantraege.push(antrag);
            })

        }

    public antragLoeschen(id: number): void {
        this.speicherService.loescheUrlaubsantrag(id)
        .catch(() => {
            alert('Löschen des Antrages ist fehlgeschlagen')
        })
        .then(() => {
            this.deleteAntragFromList(id);
        })
    }

    public antragMitarbeiterLoeschen(id: number){
        this.speicherService.loescheUrlaubsantrag(id)
        .catch(() => {
            alert('Löschen des Mitarbeiterantrages ist fehlgeschlagen')
        })
        .then(() => {
            this.deleteMitarbeiterAntragFromList(id);
        })
    }

    public deleteAntragFromList(id: number):void{
        const OldIndex = this.mitarbeiter.urlaubsantraege.findIndex((obj) => {
            return obj.id === id;
        })
        this.mitarbeiter.urlaubsantraege.splice(OldIndex,1);
    }

    public deleteMitarbeiterAntragFromList(id: number):void{
        const OldIndex = this.mitarbeiter.urlaubsantraegeMitarbeiter.findIndex((obj) => {
            return obj.id === id;
        })
        this.mitarbeiter.urlaubsantraegeMitarbeiter.splice(OldIndex,1);
    }

    public getMitarbeiterAntragFromList(id: number): Urlaubsantrag | undefined {
        return this.mitarbeiter.urlaubsantraegeMitarbeiter.find((obj) => {
            return obj.id === id;
        });
    }

    public genehmigen(id: number): void {
        const antrag = this.getMitarbeiterAntragFromList(id);
        if(antrag !== undefined) {
            const altStatus = antrag.status;
            antrag.status = "genehmigt";
            this.speicherService.aktualisiereUrlaubsantrag(antrag)
                .catch(() => {
                    alert("Genehmigen Fehlgeschlagen");
                    antrag.status = altStatus;
                })
        }
    }

    public ablehnen(id: number): void {
        this.ablehnId = id;
        this.ablehnBemerkung = "";
        document.getElementById('antrag-ablehnen-dialog-button').click();
    }

    public ablehnenSubmit():void {
        const antrag = this.getMitarbeiterAntragFromList(this.ablehnId);
        if(antrag !== undefined){
            const altStatus = antrag.status;
            antrag.status = 'abgelehnt';
            antrag.bemerkung = this.ablehnBemerkung;
            this.speicherService.aktualisiereUrlaubsantrag(antrag)
                .then(() => {
                    this.antragStellenDialogSchliessen();
                })

        }
    }

    parseDate(date) {
        const parseDate = date.split('-');
        const parseTime = parseDate[2].split(' ');
        const parsedDate = `${parseTime[0]}/${parseDate[1]}/${parseDate[0]} ${parseTime[1]}`
     
        return parsedDate
      }

}
