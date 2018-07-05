import {Hand} from "./Hand";


export class Player {

    /**
     * The hand of this player.
     */
    private __hand: Hand;

    /**
     * Whether the player is currently attempting to guess an opponent's card.
     */
    private __isGuessing: boolean;


    public get hand(): Hand {
        return this.__hand
    }

    public set hand(value: Hand) {
        this.__hand = value;
    }

    public get isGuessing(): boolean {
        return this.__isGuessing;
    }

    public set isGuessing(value: boolean) {
        this.__isGuessing = value;
    }


    constructor() {
        this.__hand = new Hand();
        this.__isGuessing = false;
    }
}
