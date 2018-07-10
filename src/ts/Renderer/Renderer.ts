import {GameState} from "../Game/GameState";
import {MarkupGenerator} from "../Markup/MarkupGenerator";

export class Renderer {


    public static redraw(gameState: GameState) {
        let $playerCardsVisible = $("#playerCardsVisible");
        let $opponentCardsVisible = $("#opponentCardsVisible");
        let $playerCardsHidden = $("#playerCardsHidden");
        let $opponentCardsHidden = $("#opponentCardsHidden");

        $playerCardsVisible.empty();
        $playerCardsHidden.empty();
        $opponentCardsVisible.empty();
        $opponentCardsHidden.empty();

        let $playerCardsBuilderHidden = $();
        let $playerCardsBuilderVisible = $();
        let $opponentCardsBuilderHidden = $();
        let $opponentCardsBuilderVisible = $();

        for (let card of gameState.opponent.hand.cards) {
            if (card.isVisibleOriginally) {
                $opponentCardsBuilderVisible = $opponentCardsBuilderVisible.add(MarkupGenerator.emitCardMarkup(card, gameState,false));
            } else {
                $opponentCardsBuilderHidden = $opponentCardsBuilderHidden.add(MarkupGenerator.emitCardMarkup(card, gameState, false));
            }
        }

        for (let card of gameState.player.hand.cards) {
            if (card.isVisibleOriginally) {
                $playerCardsBuilderVisible = $playerCardsBuilderVisible.add(MarkupGenerator.emitCardMarkup(card, gameState, true));
            } else {
                $playerCardsBuilderHidden = $playerCardsBuilderHidden.add(MarkupGenerator.emitCardMarkup(card, gameState, true));
            }
        }

        $playerCardsVisible.append($playerCardsBuilderVisible);
        $playerCardsHidden.append($playerCardsBuilderHidden);
        $opponentCardsVisible.append($opponentCardsBuilderVisible);
        $opponentCardsHidden.append($opponentCardsBuilderHidden);
    }
}