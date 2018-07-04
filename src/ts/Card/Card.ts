import {Rank, Suit} from "./CardEnums";

export class Card {

    private __suit: Suit;
    private __rank: Rank;

    private __id?: number;

    private __isVisible: boolean;
    private __isSideways: boolean;


    public get suit(): Suit {
        return this.__suit;
    }

    public get rank(): Rank {
        return this.__rank;
    }

    public get id(): number | undefined {
        return this.__id;
    }

    public set id(value: number | undefined) {
        this.__id = value;
    }

    public get isVisible(): boolean {
        return this.__isVisible;
    }

    public get isSideways(): boolean {
        return this.__isSideways;
    }

    constructor(suit: Suit, rank: Rank, isVisible: boolean = true, isSideways: boolean = false) {
        this.__suit = suit;
        this.__rank = rank;

        this.__isVisible = isVisible;
        this.__isSideways = isSideways;
    }

    /**
     * Flips the card - a visible card becomes hidden, a hidden card becomes visible.
     */
    public flip() {
        this.__isVisible = !this.__isVisible;
    }

    /**
     * Disables a card by turning it sideways.
     */
    public disable() {
        this.__isSideways = true;
    }
}
