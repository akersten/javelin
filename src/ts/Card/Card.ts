import {Rank, Suit} from "./CardEnums";

export class Card {

    private __suit: Suit;
    private __rank: Rank;

    private __id?: number;

    /**
     * Whether we haven't done our first render of this card yet (i.e. whether the renderer should animate the card).
     */
    private __renderIsFresh: boolean;

    private __isVisible: boolean;
    private __isVisibleOriginally: boolean;
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

    public get renderIsFresh(): boolean {
        return this.__renderIsFresh;
    }

    public set renderIsFresh(value: boolean) {
        this.__renderIsFresh = value;
    }

    public get isVisible(): boolean {
        return this.__isVisible;
    }

    public get isVisibleOriginally(): boolean {
        return this.__isVisibleOriginally;
    }

    public set isVisibleOriginally(value: boolean) {
        this.__isVisibleOriginally = value;
    }

    public get isSideways(): boolean {
        return this.__isSideways;
    }


    constructor(suit: Suit, rank: Rank, isVisible: boolean = true, isSideways: boolean = false) {
        this.__suit = suit;
        this.__rank = rank;

        this.__isVisible = isVisible;
        this.__isVisibleOriginally = isVisible;
        this.__isSideways = isSideways;

        this.__renderIsFresh = true;
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

    public enable() {
        this.__isSideways = false;
    }

    public getNumericRank(): number {
        switch (this.rank) {
            case "K":
                return 13;
            case "Q":
                return 12;
            case "J":
                return 11;
            case "A":
                return 1;
            default:
                return parseInt(this.rank);
        }
    }

    public compareTo(card: Card): number {
        let myCardRank: number = this.getNumericRank();
        let yourCardRank: number = card.getNumericRank();

        if (myCardRank === yourCardRank) {
            return 0;
        } else if (myCardRank < yourCardRank) {
            return -1;
        } else {
            return 1;
        }
    }

}
