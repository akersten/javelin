import {Card} from "../Card/Card";

export class Deck {

    private __cards: Card[];


    public get cards(): Card[] {
        return this.__cards;
    }


    constructor() {
        this.__cards = [];
    }


    public addCard(card: Card): void {
        this.__cards.push(card);
    }

    public drawCard(): Card | undefined {
        return this.__cards.pop();
    }

    public peekCard(): Card | undefined {
        if (!this.__cards.length) return undefined;

        return this.__cards[this.__cards.length - 1];
    }

    public getSize(): number {
        return this.__cards.length;
    }

    /**
     * Shuffle the current deck in-place using the Fisher-Yates algorithm.
     */
    public shuffle(): void {
        for (let i = this.__cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.__cards[i], this.__cards[j]] = [this.__cards[j], this.__cards[i]];
        }
    }

    public toString(): string {
        let ret: string = "";
        for (let card of this.__cards) {
            ret += card.rank + ":" + card.suit + "\n";
        }
        return ret;
    }
}
