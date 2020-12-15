export class Benutzer {
    public passwort: string
    public name: string;

    public constructor(name: string, passwort: string) {
        this.name = name;
        this.passwort = passwort;
    }
}