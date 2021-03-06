/**
 * Represents the current state of the game. Used as a reference by the renderer to draw the game board, and mutated by
 * actions as the game progresses.
 */
import {Player} from "../Player/Player";
import {Deck} from "../Deck/Deck";
import {DeckUtils} from "../Deck/DeckUtils";

export enum GameEndResult {
    NONE,
    VICTORY,
    DEFEAT,
    DRAW,
}

export class GameState {
    private __player: Player;
    private __opponent: Player;
    private __gameEndResult: GameEndResult;

    private __deck: Deck;


    public get player(): Player {
        return this.__player;
    }

    public get opponent(): Player {
        return this.__opponent;
    }

    public get deck(): Deck {
        return this.__deck;
    }

    public get gameEndResult(): GameEndResult {
        return this.__gameEndResult;
    }

    public set gameEndResult(value: GameEndResult) {
        this.__gameEndResult = value;
    }


    constructor() {
        this.__player = new Player();
        this.__opponent = new Player();
        this.__gameEndResult = GameEndResult.NONE;

        this.__deck = DeckUtils.generateDeck();
    }
}