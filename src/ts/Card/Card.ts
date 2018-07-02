import {Rank, Suit} from "./CardEnums";

export class Card {

    private __suit: Suit;
    private __rank: Rank;

    private __isVisible: boolean;


    public get suit(): Suit {
        return this.__suit;
    }

    public get rank(): Rank {
        return this.__rank;
    }

    public get isVisible(): boolean {
        return this.__isVisible;
    }

    constructor(suit: Suit, rank: Rank, isVisible: boolean = true) {
        this.__suit = suit;
        this.__rank = rank;

        this.__isVisible = isVisible;
    }

    /**
     * Flips the card - a visible card becomes hidden, a hidden card becomes visible.
     */
    public flip() {
        this.__isVisible = !this.__isVisible;
    }
}
