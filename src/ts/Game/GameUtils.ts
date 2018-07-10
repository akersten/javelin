import {GameState} from "./GameState";
import {Hand} from "../Player/Hand";
import {Card} from "../Card/Card";

export class GameUtils {

    public static findHandWithCard(state: GameState, cardId: number): {card: Card, hand: Hand, idx: number} | undefined {
        let idx = 0;

        for (let card of state.player.hand.cards) {
            if (card.id === cardId) {
                return {hand: state.player.hand, card: card, idx: idx};
            }
            idx++;
        }

        idx = 0;
        for (let card of state.opponent.hand.cards) {
            if (card.id === cardId) {
                return {hand: state.opponent.hand, card: card, idx: idx};
            }
            idx++;
        }

        return undefined;
    }
}