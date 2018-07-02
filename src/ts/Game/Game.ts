import {ActionFrame, ActionFrameType} from "./ActionFrame";
import {GameState} from "./GameState";
import {MarkupGenerator} from "../Markup/MarkupGenerator";

export class Game {
    /**
     * The stack of current game actions.
     */
    private __actionStack: ActionFrame[];

    private __gameState: GameState;


    public get gameState(): GameState {
        return this.__gameState;
    }


    constructor() {
        this.__actionStack = [];
        this.__gameState = new GameState();
    }


    private updateView() {
        $("#playerCards").empty();
        $("#opponentCards").empty();

        for (let card of this.gameState.player.hand.cards) {
            $("#playerCards").add(MarkupGenerator.emitCardMarkup(card));
        }

        for (let card of this.gameState.opponent.hand.cards) {
            $("opponentCards").add(MarkupGenerator.emitCardMarkup(card));
        }

        // TODO: reset event listeners
    }


    /**
     * Consumes an ActionFrame and mutates the game state based on the content of the ActionFrame.
     * @param {ActionFrame} frame
     */
    public pushAction(frame: ActionFrame): void {
        this.__actionStack.push(frame);
        this.__gameState = frame.payload.mutate(this.__gameState);

        //TODO: Once we have a renderer, we won't need this.
        this.updateView();
    }

    /**
     * Removes the current ActionFrame and unmutates the game state.
     */
    public popAction(): void {
        if (this.__actionStack.length < 1) {
            return;
        }

        let frame = this.__actionStack[this.__actionStack.length - 1];

        this.__gameState = frame.payload.unmutate(this.__gameState);
        this.__actionStack.pop();

        // TODO: Once we have a renderer, we won't need this.
        this.updateView()
    }
}
