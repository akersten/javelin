import {Game} from "../Game/Game";
import {GameUtils} from "../Game/GameUtils";
import {HandReplaceCardAction} from "../Game/Actions";
import {ActionFrame} from "../Game/ActionFrame";
import {Hand} from "../Player/Hand";
import {Card} from "../Card/Card";

export class EventHandler {

    /**
     * Attach event listeners to the elements in the DOM so that we can interact with the game.
     * @param {Game} game
     */
    public static attachEventListeners(game: Game): void {
        // TODO
        $(".card").on("click", (event) => {this.eventCardClicked(event, game)})
    }




    private static eventCardClicked(event: any, game: Game) {
        let cardId = $(event.currentTarget).data("card-id");

        let target: {card: Card, hand: Hand} | undefined = GameUtils.findHandWithCard(game.gameState, cardId);

        if (typeof target === "undefined") {
            return;
        }

        game.pushAction(new ActionFrame(new HandReplaceCardAction(target.hand, target.card)));
    }
}