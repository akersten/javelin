import {ActionFrameType, IActionFramePayload} from "./ActionFrame";
import {Card} from "../Card/Card";
import {Player} from "../Player/Player";
import {GameState} from "./GameState";
import {Hand} from "../Player/Hand";

/**
 * Action representing the start of the game.
 */
export class GameStartLocalAction implements IActionFramePayload {

    public readonly type: ActionFrameType = ActionFrameType.GAME_START_LOCAL;

    private __player: Player;
    private __opponent: Player;


    public get opponent(): Player {
        return this.__opponent;
    }

    public get player(): Player {
        return this.__player;
    }


    constructor(player: Player, opponent: Player) {
        this.__player = player;
        this.__opponent = opponent;
    }


    public mutate(state: GameState): GameState {
        state.deck.shuffle();

        state.player.hand = Hand.generateHand(state.deck, 16);
        state.opponent.hand = Hand.generateHand(state.deck, 16);

        return state;
    }

    public unmutate(state: GameState): GameState {
        return state;
    }
}

/**
 * Action representing the game dealing a card to a player, adding the card to their deck.
 */
export class GameDealAction implements IActionFramePayload {
    private __player: Player;
    private __card: Card;


    public get player(): Player {
        return this.__player;
    }

    public get card(): Card {
        return this.__card;
    }


    public readonly type: ActionFrameType = ActionFrameType.GAME_DEAL;


    constructor(player: Player, card: Card) {
        this.__player = player;
        this.__card = card;
    }


    public mutate(state: GameState): GameState {
        return state;
    }

    public unmutate(state: GameState): GameState {
        return state;
    }
}
