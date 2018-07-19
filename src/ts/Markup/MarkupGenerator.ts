import {Card} from "../Card/Card";
import {Suit} from "../Card/CardEnums";
import {GameState} from "../Game/GameState";

export class MarkupGenerator {

    private static getSuitDisplayName(suit: Suit): string {
        switch (suit) {
            case Suit.CLUBS:
                return "♣";
            case Suit.DIAMONDS:
                return "♦";
            case Suit.HEARTS:
                return "♥";
            case Suit.SPADES:
                return "♠";
        }
    }


    /**
     * Returns the markup for a card to render on the gameboard.
     * @param {Card} card The card object to render.
     * @param {GameState} gameState The current state of the game.
     * @param {boolean} isPlayerCard Whether this card belongs to the player.
     * @return {JQuery<HTMLElement>}
     */
    public static emitCardMarkup(card: Card, gameState: GameState, isPlayerCard: boolean) {
        let $container = $("<div>", {"data-card-id": card.id}).addClass("cardContainer");
        let $emit = $("<div>").addClass("card");

        if (((card.suit === Suit.HEARTS) || (card.suit === Suit.DIAMONDS)) && card.isVisible) {
            $emit.addClass("red");
        }

        if (card.renderIsFresh) {
            $emit.addClass("fresh");
        }

        if (card.isSideways) {
            $emit.addClass("disabled");
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
            if (gameState.player.isGuessing) {
                if (!card.isSideways) {
                    $cardControls = $cardControls.append($("<a>", {
                        "data-card-id": card.id,
                        "data-action": "lower"
                    }).addClass("cardAction").attr("href", "#").append($("<span>").text("L")).append($("<span>").text("ower").addClass("hide-small")));
                    $cardControls = $cardControls.append($("<a>", {
                        "data-card-id": card.id,
                        "data-action": "higher"
                    }).addClass("cardAction").attr("href", "#").append($("<span>").text("H")).append($("<span>").text("igher").addClass("hide-small")));
                }
            } else if (gameState.player.isAttacking) {
                if (!card.isSideways) {
                    $cardControls = $cardControls.append($("<a>", {
                        "data-card-id": card.id,
                        "data-action": "attackselect"
                    }).addClass("cardAction").attr("href", "#").append($("<span>").text("S")).append($("<span>").text("elect").addClass("hide-small")));
                }
            } else {
                if (gameState.deck.getSize() > 0) {
                    $cardControls = $cardControls.append($("<a>", {
                        "data-card-id": card.id,
                        "data-action": "replace"
                    }).addClass("cardAction").attr("href", "#").append($("<span>").text("R")).append($("<span>").text("eplace").addClass("hide-small")));
                }
            }
        }

        if (!isPlayerCard && !card.isSideways && !gameState.player.isGuessing && !gameState.player.isAttacking) {
            if (card.isVisible) {
                $cardControls = $cardControls.append($("<a>", {
                    "data-card-id": card.id,
                    "data-action": "attack"
                }).addClass("cardAction").attr("href", "#").append($("<span>").text("A")).append($("<span>").text("ttack").addClass("hide-small")));
            } else {
                $cardControls = $cardControls.append($("<a>", {
                    "data-card-id": card.id,
                    "data-action": "guess"
                }).addClass("cardAction").attr("href", "#").append($("<span>").text("G")).append($("<span>").text("uess").addClass("hide-small")));
            }
        }

        $container = $container.append($emit);
        $container = $container.append($cardControls);

        card.renderIsFresh = false;
        return $container;
    }
}
