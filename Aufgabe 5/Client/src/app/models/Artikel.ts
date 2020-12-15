export class Artikel {
    public id: number;
    public kurzText: string;
    public beschreibung: string;
    public preis: number;

    public constructor(id: number, kurzText: string, beschreibung: string, preis: number) {
        this.id = id;
        this.kurzText = kurzText;
        this.beschreibung = beschreibung;
        this.preis = preis;
    }
}