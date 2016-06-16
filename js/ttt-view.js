let View = function (game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupBoard();
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  $('ul.grid').children().on("click touchstart", (e) => {
    let $square = $(e.currentTarget);
    let pos = $square.attr("data-pos").split(",")
    if (!this.game.board.isEmptyPos(pos)) {
      alert(`${$square.text()} says "WTF man, get your own square!"`);
    } else {
      this.makeMove($square);
      this.game.playMove(pos);
      this.isOver();
    }
  })
};

View.prototype.isOver = function () {
  if (this.game.isOver()) {
    [mark, seq] = this.game.board.winner();
    seq.forEach( (pos) => {
      this.markWinner($(`[data-pos='${pos}']`))
    });
    $('ul.grid').children().removeClass("has-hover");
    $('ul.grid').children().off("click touchstart");

    this.playAgain(mark);
  }
};

View.prototype.playAgain = function (mark) {
  let $win = $("<h1>").text(`${mark} has won!`);
  $(".ttt").append($win);
  let $playAgain = $('<input type="button" value="Play Again?"/>');
  $playAgain.addClass("waves-effect").addClass("waves-light")
            .on("click touchstart", function(){
                document.location.reload(false);
            })
  $("body").append($("<div>").addClass("again-button")
                             .append($playAgain));

};

View.prototype.makeMove = function ($square) {

  if (this.game.currentPlayer === 'x') {
    $square.css("background-color", "#009E60");
    $square.text("X")
  } else {
    $square.css("background-color", "#FFD500");
    $square.text("O")
  }
};

View.prototype.markWinner = function ($square) {
    $square.css("background-color", "#FF5800");
};

View.prototype.setupBoard = function () {

  let gridView = $("<ul>").addClass("grid").addClass("group");
  let grid = this.game.board.grid;
  grid.forEach( (row, rowIdx) => {
    row.forEach((col, colIdx) => {
      gridView.append($("<li>")
              .addClass("has-hover")
              .attr("data-pos", [rowIdx, colIdx]));
    });

  });

  this.$el.append(gridView);
};

module.exports = View;
