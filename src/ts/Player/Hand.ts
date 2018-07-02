import {Card} from "../Card/Card";
import {Deck} from "../Deck/Deck";

export class Hand {
    private __cards: Card[];


    public get cards(): Card[] {
        return this.__cards;
    }


    constructor() {
        this.__cards = [];
    }


    public addToHand(...cards: Card[]) {
        this.__cards.push(...cards);
    }


    /**
     * Given a deck, draw a hand for a player.
     * @param {Deck} deck The deck from which to draw cards. This function will not shuffle the deck.
     * @param {number} numCards The number of cards to generate in this hand. The first half will be face-down.
     * @return {Hand} The generated hand.
     */
    public static generateHand(deck: Deck, numCards: number): Hand {
        let h = new Hand();

        for (let i = 0; i < numCards; i++) {
            let c: Card | undefined = deck.drawCard();
            if (typeof c === "undefined") {
                break;
            }

            if (i < numCards / 2) {
                c.flip();
            }

            h.addToHand(c)
        }

        return h;
    }
}
