import { WarenkorbPosition } from "./WarenkorbPosition";


export class Warenkorb {
    public id: number;
    public kundenId: number;
    public status: string;
    public positionen: WarenkorbPosition[];

    public constructor(id: number, kundenId: number, status: string, positionen: WarenkorbPosition[]) {
        this.id = id;
        this.kundenId = kundenId;
        this.status = status;
        this.positionen = positionen;
    }
}