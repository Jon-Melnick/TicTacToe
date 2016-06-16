const View = require("./ttt-view.js");
const Game = require("./game.js");

$( () => {

  const rootEl = $(".ttt");
  let g = new Game();
  new View(g, rootEl);

});
