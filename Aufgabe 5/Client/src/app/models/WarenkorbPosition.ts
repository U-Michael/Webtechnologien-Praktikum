export class WarenkorbPosition {
    public nr: number;
    public artikelId: number;
    public artikelKurzText: string;
    public artikelPreis: number;
    public menge: number;
    public mengeNeu: number;

    public constructor(nr: number, artikelId: number, artikelKurzText: string, artikelPreis: number, menge: number) {
        this.nr = nr;
        this.artikelId = artikelId;
        this.artikelKurzText = artikelKurzText;
        this.artikelPreis = artikelPreis;
        this.menge = Number(menge);
        this.mengeNeu = Number(menge);
    }

}