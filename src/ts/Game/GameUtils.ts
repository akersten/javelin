import {GameState} from "./GameState";
import {Hand} from "../Player/Hand";
import {Card} from "../Card/Card";
import {Player} from "../Player/Player";

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

    /**
     * Check if the given player has won the game.
     *
     * @param {GameState} state Current state of the game.
     * @param {Player} player Player for whom to check victory condition.
     * @return {boolean} Whether the given player has won the game.
     */
    public static checkVictory(state: GameState, player: Player): boolean {
        let opponent = state.opponent;
        if (player === opponent) {
            opponent = state.player;
        }

        let revealVictory: boolean = true;
        let attackVictory: boolean = true;
        let forfeitVictory: boolean = true;

        for (let card of opponent.hand.cards) {
            if (revealVictory && !card.isVisible) {
                revealVictory = false;
            }
            if (attackVictory && card.isVisible) {
                attackVictory = false;
            }
        }

        if (!opponent.isForfeit) {
            forfeitVictory = false;
        }

        return revealVictory || attackVictory || forfeitVictory;
    }
}