import {Game} from "./Game/Game";
import {GameStartLocalAction} from "./Game/Actions";
import {ActionFrame} from "./Game/ActionFrame";

let game: Game = new Game();

$('#menuItemNewGame').on('click', (event) => {
    game.pushAction(new ActionFrame(new GameStartLocalAction(game.gameState.player, game.gameState.opponent)));
});
