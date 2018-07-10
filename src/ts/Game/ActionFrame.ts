/**
 * The type of action that was performed.
 */
import {Card} from "../Card/Card";
import {Player} from "../Player/Player";
import {GameState} from "./GameState";
import {Hand} from "../Player/Hand";


/**
 * The type of action that the ActionFrame represents.
 */
export enum ActionFrameType {
    GAME_START_LOCAL,
    GAME_START_SPLITSCREEN,
    GAME_START_ONLINE,

    HAND_REPLACE_CARD,

    PLAYER_GUESS_CARD_START,
    PLAYER_GUESS_CARD_END,
}


/**
 * The interface capturing all possible payloads for an action - provides standard field names to share between actions,
 * since many actions will have the concept of a card or player.
 */
export interface IActionFramePayload {
    readonly type: ActionFrameType;

    mutate(state: GameState): GameState;

    unmutate(state: GameState): GameState;

    readonly card?: Card;
    readonly target?: Card;
    readonly hand?: Hand;
    readonly player?: Player;
    readonly opponent?: Player;
    readonly guessedHigher?: boolean;
}


/**
 * Represents an action that is taken in the game. Each action is fed to the game by `pushAction` in Game.ts, and the
 * stack of actions drives the current state of the game.
 */
export class ActionFrame {
    private __type: ActionFrameType;
    private __payload: IActionFramePayload;


    public get type(): ActionFrameType {
        return this.__type;
    }

    public get payload(): IActionFramePayload {
        return this.__payload;
    }


    constructor(payload: IActionFramePayload) {
        this.__payload = payload;
        this.__type = payload.type;
    }
}
