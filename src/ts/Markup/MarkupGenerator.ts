import {Card} from "../Card/Card";
import {Suit} from "../Card/CardEnums";

export class MarkupGenerator {

    private static getSuitDisplayName(suit: Suit): string {
        switch (suit) {
            case Suit.CLUBS: return "♣";
            case Suit.DIAMONDS: return "♦";
            case Suit.HEARTS: return "♥";
            case Suit.SPADES: return "♠";
        }
    }


    public static emitCardMarkup(card: Card) {
        let $emit = $("<div>").addClass("card").data("card-id",card.id);

        if (((card.suit === Suit.HEARTS) || (card.suit === Suit.DIAMONDS)) && card.isVisible) {
            $emit.addClass("red");
        }

        if (card.isVisible) {
            $emit = $emit.append(
              $("<p>").text(this.getSuitDisplayName(card.suit))
            );

            $emit = $emit.append(
                $("<p>").text(card.rank).addClass("rank")
            );

            $emit = $emit.append(
                $("<p>").text(this.getSuitDisplayName(card.suit))
            );
        } else {
            $emit = $emit.append(
                $("<p>").text("?").addClass("rank")
            );
        }

        return $emit;
    }
}
