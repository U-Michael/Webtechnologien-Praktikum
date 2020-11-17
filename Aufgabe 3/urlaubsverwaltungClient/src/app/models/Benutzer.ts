import { Mitarbeiter } from "./Mitarbeiter";

export class Benutzer {
    public id: number;
    public name: string;
    public passwort: string;
    public mitarbeiterId: number;

    public constructor(id: number, name: string, passwort: string, mitarbeiterId: number) {
        this.id = id;
        this.name = name;
        this.passwort = passwort;
        this.mitarbeiterId = mitarbeiterId;
    }
}