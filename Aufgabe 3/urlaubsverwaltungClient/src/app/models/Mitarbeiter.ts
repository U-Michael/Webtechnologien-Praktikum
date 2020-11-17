import { Urlaubsantrag } from "./Urlaubsantrag";
import { Url } from "url";

export class Mitarbeiter {
    public id: number;
    public name: string;
    public mitarbeiter: Array<number>;
    public urlaubsantraege: Array<Urlaubsantrag>;
    public urlaubsantraegeMitarbeiter: Array<Urlaubsantrag>;

    public constructor(id: number, name: string, mitarbeiter: Array<number>, urlaubsantraege: Array<Urlaubsantrag>, urlaubsantraegeMitarbeiter: Array<Urlaubsantrag>) {
        this.id = id;
        this.name = name;
        this.mitarbeiter = mitarbeiter;
        this.urlaubsantraege = urlaubsantraege;
        this.urlaubsantraegeMitarbeiter = urlaubsantraegeMitarbeiter;
    }
}