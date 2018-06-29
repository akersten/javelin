import {Deck} from "./Deck";
import {Rank} from "../Card/CardEnums";
import {Card} from "../Card/Card";

export class DeckUtils {
    public static generateDeck(): Deck {
        let d = new Deck();

        for (let suit = 0; suit < 4; suit++) {
            d.addCard(new Card(suit, Rank.ACE));
            d.addCard(new Card(suit, Rank.TWO));
            d.addCard(new Card(suit, Rank.THREE));
            d.addCard(new Card(suit, Rank.FOUR));
            d.addCard(new Card(suit, Rank.FIVE));
            d.addCard(new Card(suit, Rank.SIX));
            d.addCard(new Card(suit, Rank.SEVEN));
            d.addCard(new Card(suit, Rank.EIGHT));
            d.addCard(new Card(suit, Rank.NINE));
            d.addCard(new Card(suit, Rank.TEN));
            d.addCard(new Card(suit, Rank.JACK));
            d.addCard(new Card(suit, Rank.QUEEN));
            d.addCard(new Card(suit, Rank.KING));
        }

        return d;
    }
}
