export class Kunde {
    public id: number;
    public name: string;
    public benutzername: string;
    public passwort: string;

    public constructor(id: number, name: string, benutzername: string, passwort: string) {
        this.id = id;
        this.name = name;
        this.benutzername = benutzername;
        this.passwort = passwort;
    }
}