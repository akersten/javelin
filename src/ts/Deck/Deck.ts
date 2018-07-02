import {Card} from "../Card/Card";

export class Deck {

    private __cards: Card[];

    constructor() {
        this.__cards = [];
    }

    public addCard(card: Card): void {
        this.__cards.push(card);
    }

    public getCards(): Card[] {
        return this.__cards;
    }

    public toString(): string {
        let ret: string = "";
        for (let card of this.__cards) {
            ret += card.rank + ":" + card.suit + "\n";
        }
        return ret;
    }
}
