import {ActionFrameType, IActionFramePayload} from "./ActionFrame";
import {Card} from "../Card/Card";
import {Player} from "../Player/Player";
import {GameState} from "./GameState";
import {Hand} from "../Player/Hand";
import {GameUtils} from "./GameUtils";

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
        // TODO
        return state;
    }
}


export class HandReplaceCardAction implements IActionFramePayload {
    public readonly type: ActionFrameType = ActionFrameType.HAND_REPLACE_CARD;

    private __hand: Hand;
    private __card: Card;

    private __drawnCard?: Card;

    public get card(): Card {
        return this.__card
    }

    public get hand(): Hand{
        return this.__hand;
    }


    constructor(hand: Hand, card: Card) {
        this.__hand = hand;
        this.__card = card;
    }


    public mutate(state: GameState): GameState {
        this.__drawnCard = state.deck.drawCard();

        if (typeof this.__drawnCard === "undefined") {
            return state;
        }

        for (let i = 0; i < this.__hand.cards.length; i++) {
            if (this.__hand.cards[i] == this.__card) {
                this.__hand.cards[i] = this.__drawnCard;
                this.__drawnCard.renderIsFresh = true; // In case it was previously replaced.
                break;
            }
        }

        return state;
    }

    public unmutate(state: GameState): GameState {
        if (typeof this.__drawnCard === "undefined") {
            return state;
        }
        if (typeof this.__drawnCard.id === "undefined") {
            return state;
        }


        let cardInfo = GameUtils.findHandWithCard(state,this.__drawnCard.id);

        if (typeof cardInfo === "undefined") {
            return state;
        }

        // Shouldn't need this, but just in case...
        if (cardInfo.hand !== this.__hand) {
            return state;
        }

        state.deck.pushCard(this.__drawnCard);
        this.__hand.cards.splice(cardInfo.idx, 1, this.__card);
        this.__card.renderIsFresh = true;

        return state;
    }
}


export class PlayerGuessCardStartAction implements IActionFramePayload {
    public readonly type: ActionFrameType = ActionFrameType.PLAYER_GUESS_CARD_START;

    private __hand: Hand;
    private __card: Card;
    private __player: Player;


    public get card(): Card {
        return this.__card
    }

    public get hand(): Hand{
        return this.__hand;
    }

    public get player(): Player {
        return this.__player;
    }


    constructor(hand: Hand, card: Card, player: Player) {
        this.__hand = hand;
        this.__card = card;
        this.__player = player;
    }

    public mutate(state: GameState): GameState {
        this.__player.isGuessing = true;
        return state;
    }

    public unmutate(state: GameState): GameState {
        this.__player.isGuessing = false;
        return state;
    }
}


export class PlayerGuessCardEndAction implements IActionFramePayload {
      public readonly type: ActionFrameType = ActionFrameType.PLAYER_GUESS_CARD_END;

    private __hand: Hand;
    private __card: Card;
    private __player: Player;
    private __guessedHigher: boolean;
    private __target: Card;


    public get card(): Card {
        return this.__card
    }

    public get hand(): Hand{
        return this.__hand;
    }

    public get player(): Player {
        return this.__player;
    }

    public get guessedHigher(): boolean {
        return this.__guessedHigher;
    }

    public get target(): Card {
        return this.__target;
    }


    constructor(hand: Hand, card: Card, player: Player, guessedHigher: boolean, target: Card) {
        this.__hand = hand;
        this.__card = card;
        this.__player = player;
        this.__guessedHigher = guessedHigher;
        this.__target = target;
    }


    public mutate(state: GameState): GameState {
        //TODO
        this.__player.isGuessing = false;

        if ((this.guessedHigher && this.__target.compareTo(this.__card) > 0)
            || (!this.guessedHigher && this.__target.compareTo(this.__card) < 0)) {
            this.__card.disable();
            this.__target.flip();
            this.__target.renderIsFresh = true;
        }

        return state;
    }

    public unmutate(state: GameState): GameState {
        if (this.__card.isSideways) {
            this.__card.enable();
            this.__target.flip();
            this.__card.renderIsFresh = true;
            this.__target.renderIsFresh = true;
        }

        this.__player.isGuessing = true;
        return state;
    }
}