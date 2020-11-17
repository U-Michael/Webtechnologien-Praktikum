
export class Urlaubsantrag {
    public id: number;
    public von: string;
    public bis: string;
    public mitarbeiterId: number;
    public antragsteller: string;
    public zeitstempel: string;
    public status: string;
    public bemerkung: string;

    public constructor(id: number, von: string, bis: string, mitarbeiterId: number, antragsteller: string, zeitstempel: string, status: string, bemerkung: string) {
        this.id = id;
        this.von = von;
        this.bis = bis;
        this.mitarbeiterId = mitarbeiterId;
        this.antragsteller = antragsteller;
        this.zeitstempel = zeitstempel;
        this.status = status;
        this.bemerkung = bemerkung;
    }

}