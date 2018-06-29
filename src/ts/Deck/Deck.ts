import {Card} from "../Card/Card";

export class Deck {

    private _cards: Card[];

    constructor() {
        this._cards = [];
    }

    public addCard(card: Card): void {
        this._cards.push(card);
    }

    public getCards(): Card[] {
        return this._cards;
    }

    public toString(): string {
        let ret:string = "";
        for (let card of this._cards) {
            ret += card.getRank() + ":" + card.getSuit() + "\n";
        }
        return ret;
    }
}
