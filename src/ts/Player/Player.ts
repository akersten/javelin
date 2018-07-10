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

    /**
     * Whether the player is currently attacking an opponent's card.
     */
    private __isAttacking: boolean;


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


    public get isAttacking(): boolean {
        return this.__isAttacking;
    }

    public set isAttacking(value: boolean) {
        this.__isAttacking = value;
    }


    constructor() {
        this.__hand = new Hand();
        this.__isGuessing = false;
        this.__isAttacking = false;
    }
}
