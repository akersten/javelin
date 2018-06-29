import {Rank, Suit} from "./CardEnums";

export class Card {

    private _suit: Suit;
    private _rank: Rank;

    constructor(suit: Suit, rank: Rank) {
        this._suit = suit;
        this._rank = rank;
    }

    public getSuit(): Suit {
        return this._suit;
    }

    public getRank(): Rank {
        return this._rank;
    }
}
