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
        // TODO
        return state;
    }
}

/**
 * Action representing the game dealing a card to a player, adding the card to their deck.
 */
export class GameDealAction implements IActionFramePayload {
    public readonly type: ActionFrameType = ActionFrameType.GAME_DEAL;


    private __player: Player;
    private __card: Card;


    public get player(): Player {
        return this.__player;
    }

    public get card(): Card {
        return this.__card;
    }


    constructor(player: Player, card: Card) {
        this.__player = player;
        this.__card = card;
    }


    public mutate(state: GameState): GameState {
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
        let newCard = state.deck.drawCard();

        if (typeof newCard === "undefined") {
            return state;
        }

        for (let i = 0; i < this.__hand.cards.length; i++) {
            if (this.__hand.cards[i] == this.__card) {
                this.__hand.cards[i] = newCard;
                break;
            }
        }

        return state;
    }

    public unmutate(state: GameState): GameState {
        // TODO
        return state;
    }
}


export class PlayerGuessCardAction implements IActionFramePayload {
    public readonly type: ActionFrameType = ActionFrameType.PLAYER_GUESS_CARD;

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