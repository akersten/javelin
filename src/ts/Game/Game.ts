import {ActionFrame, ActionFrameType} from "./ActionFrame";
import {GameState} from "./GameState";
import {MarkupGenerator} from "../Markup/MarkupGenerator";
import {Renderer} from "../Renderer/Renderer";
import {EventHandler} from "../Input/EventHandler";
import {GameUtils} from "./GameUtils";
import {GameLoseAction, GameWinAction} from "./Actions";

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
        $("#gameboard *").off(); // Remove event listeners
        Renderer.redraw(this.__gameState);
        EventHandler.attachEventListeners(this);
    }

    private doAutoActions() {
        if (GameUtils.checkVictory(this.gameState, this.gameState.player)) {
            this.pushAction(new ActionFrame(new GameWinAction()));
        } else if (GameUtils.checkVictory(this.gameState, this.gameState.opponent)) {
            this.pushAction(new ActionFrame(new GameLoseAction()));
        }
    }

    /**
     * Consumes an ActionFrame and mutates the game state based on the content of the ActionFrame.
     * @param {ActionFrame} frame
     */
    public pushAction(frame: ActionFrame): void {
        this.__actionStack.push(frame);
        this.__gameState = frame.payload.mutate(this.__gameState);

        // If the last action was automatic, don't run automatic actions again...
        if (!this.peekAction()!.payload.isAutoAction) {
            this.doAutoActions();
        }


        //TODO: Once we have a renderer, we won't need this.
        this.updateView();
    }

    /**
     * Removes the current ActionFrame and unmutates the game state.
     */
    public popAction(): void {
        let keepPopping = true;

        while (keepPopping) {
            if (this.__actionStack.length < 1) {
                return;
            }

            let frame = this.__actionStack[this.__actionStack.length - 1];

            this.__gameState = frame.payload.unmutate(this.__gameState);
            if (!frame.payload.isAutoAction) {
                keepPopping = false;
            }
            this.__actionStack.pop();
        }

        // TODO: Once we have a renderer, we won't need this.
        this.updateView()
    }

    /**
     * Returns the last action that was performed in the game.
     * @return {ActionFrame | undefined} The last action that was performed in the game.
     */
    public peekAction(): ActionFrame | undefined {
        if (this.__actionStack.length < 1) {
            return undefined;
        }

        return this.__actionStack[this.__actionStack.length - 1];
    }
}
