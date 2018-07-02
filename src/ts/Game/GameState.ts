/**
 * Represents the current state of the game. Used as a reference by the renderer to draw the game board, and mutated by
 * actions as the game progresses.
 */
import {Player} from "../Player/Player";

export class GameState {
    private __player: Player;
    private __opponent: Player;


    public get player(): Player {
        return this.__player;
    }

    public get opponent(): Player {
        return this.__opponent;
    }


    constructor() {
        this.__player = new Player();
        this.__opponent = new Player();
    }
}