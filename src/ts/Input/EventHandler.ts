import {Game} from "../Game/Game";
import {GameUtils} from "../Game/GameUtils";
import {HandReplaceCardAction, PlayerGuessCardAction} from "../Game/Actions";
import {ActionFrame} from "../Game/ActionFrame";
import {Hand} from "../Player/Hand";
import {Card} from "../Card/Card";

export class EventHandler {

    /**
     * Attach event listeners to the elements in the DOM so that we can interact with the game.
     * @param {Game} game
     */
    public static attachEventListeners(game: Game): void {
        $(".card").on("click", (event) => {
            this.eventCardClicked(event, game)
        });

        $(".cardAction").on("click", (event) => {
            this.eventCardAction(event, game)
        });
        $("#undoButton").on("click", (event) => {
            game.popAction();
        });
    }

    private static eventCardClicked(event: any, game: Game) {
        let cardId = $(event.currentTarget).data("card-id");
        let cardHandObj: { card: Card, hand: Hand } | undefined = GameUtils.findHandWithCard(game.gameState, cardId);

        if (typeof cardHandObj === "undefined") {
            return;
        }

        //TODO: If we're in select-mode then we should select this card. Actually, might not need this..
    }

    private static eventCardAction(event: any, game: Game) {
        let cardId = $(event.currentTarget).data("card-id");
        let action = $(event.currentTarget).data("action");
        let cardHandObj: { card: Card, hand: Hand } | undefined = GameUtils.findHandWithCard(game.gameState, cardId);
        if (typeof cardHandObj === "undefined") {
            return;
        }

        switch (action) {
            case "replace":
                game.pushAction(new ActionFrame(new HandReplaceCardAction(cardHandObj.hand, cardHandObj.card)));
                break;
            case "attack":
                alert("TODO: Attack");
                break;
            case "guess":
                game.pushAction(new ActionFrame(new PlayerGuessCardAction(cardHandObj.hand, cardHandObj.card, game.gameState.player)));
                break;
            case "higher":
                alert("TODO: Other card is higher");
                break;
            case "lower":
                alert("TODO: Other card is lower");
                break;
            default:
                return;
        }
    }
}