# javelin
A card game?

## Summary

Javelin is a card game played with a standard deck of 52 cards between two
players. Players start with 16 cards each, 8 face-up and 8 face-down. The
objective is to reveal all of your opponent's face-down cards, or cause
them to run out of face-up cards.

## Rules of Play

* Players are dealt 16 cards, the first 8 of which are placed face-down, the
  remainder face-up, in front of the player in two rows, with the face-down
  cards closer to the player.
* Taking turns and starting with the player who dealt, each player performs
  one of the following actions during their turn:
    * Guess an opponent's face-down card
    * Attack an opponent's face-up card
    * Replace a face-up card of their own
    * Forfeit (not recommended)
* At the end of a turn, if either of the below conditions are true for a
  player, that player loses the round and players proceed to scoring:
    * All of their cards are face-up
    * None of their cards are face-up

### Guessing Cards
A face-up card may be used to guess one of the other player's face-down cards.
Players select a guessing card (one of their own face-up cards) and a target
card (one of the opponent's face-down cards) and announce either "higher" or
"lower" to attempt to reveal the face-down card.

If the target card is "higher" or "lower" than the guessing card, the guess
is successful. A card with the same value as another is neither "higher" nor
"lower" than it.

After a successful guess, the guessing card is turned sideways. Sideways cards
may not be used to guess. The opponent's face-down card is then turned face-up.

### Attacking Cards
A face-up card may be used to attack one of the other player's face-up cards if
the attacking card is of equal or greater face value than the target. The target
card is discarded from play.

The attacking card is turned sideways for the remainder of the round. Sideways
cards may not be used to attack, but may themselves be attacked.

### Replacing Cards
A player may choose to discard one of their face-up cards and replace it with
a freshly-drawn card from the deck.

If a sideways card is replaced, it resets its orientation (i.e. a sideways
card is replaced with an upright card and can be used to attack or guess again).

## Scoring
(Todo)

## Minor Points
* Aces are low
