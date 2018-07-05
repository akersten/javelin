import {Card} from "../Card/Card";
import {Suit} from "../Card/CardEnums";
import {Hand} from "../Player/Hand";

export class MarkupGenerator {

    private static getSuitDisplayName(suit: Suit): string {
        switch (suit) {
            case Suit.CLUBS: return "♣";
            case Suit.DIAMONDS: return "♦";
            case Suit.HEARTS: return "♥";
            case Suit.SPADES: return "♠";
        }
    }


    /**
     * Returns the markup for a card to render on the gameboard.
     * @param {Card} card The card object to render.
     * @param {boolean} isPlayerCard Whether this card belongs to the player.
     * @return {JQuery<HTMLElement>}
     */
    public static emitCardMarkup(card: Card, isPlayerCard: boolean) {
        let $container = $("<div>", {"data-card-id": card.id}).addClass("cardContainer");
        let $emit = $("<div>").addClass("card");

        if (((card.suit === Suit.HEARTS) || (card.suit === Suit.DIAMONDS)) && card.isVisible) {
            $emit.addClass("red");
        }

        if (card.renderIsFresh) {
            $emit.addClass("fresh");
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



        let $cardControls = $("<div>").addClass("cardControls");



        if (isPlayerCard && card.isVisible) {
            $cardControls = $cardControls.append($("<a>").attr("href","#").append($("<span>").text("R")).append($("<span>").text("eplace").addClass("hide-small")));
        }

        if (!isPlayerCard && !card.isSideways) {
            if (card.isVisible) {
                $cardControls = $cardControls.append($("<a>").attr("href","#").append($("<span>").text("A")).append($("<span>").text("ttack").addClass("hide-small")));
            } else {
                $cardControls = $cardControls.append($("<a>").attr("href","#").append($("<span>").text("G")).append($("<span>").text("uess").addClass("hide-small")));
            }
        }

        $container = $container.append($emit);
        $container = $container.append($cardControls);

        card.renderIsFresh = false;
        return $container;
    }
}
