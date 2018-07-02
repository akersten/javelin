import {Hand} from "./Hand";


export class Player {

    /**
     * The hand of this player.
     */
    private __hand: Hand;

    public get hand(): Hand {
        return this.__hand
    }

    public set hand(value: Hand) {
        this.__hand = value;
    }


    constructor() {
        this.__hand = new Hand();
    }
}
