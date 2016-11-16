let controller = {
  $board: null,
  $statusMessage: null,

  showCurrentPlayer: function() {
    this.$statusMessage.text('Current Player: ' + game.currentPlayer);
  },

  showWinner: function() {
    this.$statusMessage.text('Player ' + game.currentPlayer + ' has won!');
  },

  showCat: function() {
    this.$statusMessage.text('CAT!!!');
  },

  getCell: function(r, c) {
    let id = 'cell' + r + c;
    return $('#' + id);
  },

  move: function(r, c) {
    game.move(r, c);
    let $cell = this.getCell(r, c);
    $cell.text(game.currentPlayer)
         .addClass(game.currentPlayer)
         .prop('disabled', true);
    if (game.checkForEndOfGame() === false) {
      game.togglePlayer();
      this.showCurrentPlayer();
    }
    else if (game.winner) {
      this.showWinner();
      $('.cell').prop('disabled', true);   // winner means no more moves
    }
    else {
      this.showCat();
    }
  },

  buildGameBoard: function() {
    for (let r = 0; r < game.board.length; r++) {
      let $row = $('<div>');
      for (let c = 0; c < game.board[r].length; c++) {
        let id = 'cell' + r + c;
        let $button = $('<button id="' + id +
          '" class="btn btn-lg cell" onclick="controller.move(' +
    r + ',' + c + ')"></button>');
        $row.append($button);
      }
      this.$board.append($row);
    }
  },

  reset: function() {
    game.reset();
    $('.cell').text('?').removeClass('X O').prop('disabled', false);
    this.showCurrentPlayer();
  }
};

$(function() {
  controller.$board = $('#board');
  controller.$statusMessage = $('#statusMessage');
  controller.buildGameBoard();
  controller.reset();
});
