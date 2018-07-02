import {Card} from "../Card/Card";

export class Hand {
    private __cards: Card[];


    public get cards(): Card[] {
        return this.__cards;
    }


    constructor () {
        this.__cards = [];
    }


    public addToHand(...cards: Card[]) {
        this.__cards.push(...cards);
    }
}
