<!--
This file is auto-generated from a 'template.md'
file using the 'md-process' script.
Therefore *DO NOT* edit this file directly!
Instead edit the template file and then run 'md-process'.
-->

# Solution using jQuery

## index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Tic Tac Toe</title>
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="app.css">
  </head>
  <body>
    <section>
      <h1>Tic Tac Toe!</h1>
      <div id="board" class="container well"></div>
      <p id="statusMessage"></p>
      <button class="btn btn-primary btn-large" onclick="controller.reset()">New Game</button>
    </section>
    <script src="bower_components/jquery/dist/jquery.min.js" charset="utf-8"></script>
    <script src="tic-tac-toe.js" charset="utf-8"></script>
    <script src="app.js" charset="utf-8"></script>
  </body>
</html>
```

## app.css

```css
* {
  text-align: center;
  font-family: "Courier"
}
.cell {
  background-color: white;
}
.X {
  color: green;
}
.O {
  color: red;
}
```

## app.js

```javascript
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
```

## tic-tac-toe.js

```javascript
// The Tic-Tac-Toe Game (Model)

let game = {
  board: [
    ['?', '?', '?'],
    ['?', '?', '?'],
    ['?', '?', '?']
  ],
  currentPlayer: 'X',

  reset: function() {
    for (var r = 0; r < this.board.length; r++) {
      let row = this.board[r];
      for (var c = 0; c < row.length; c++) {
        row[c] = '?';
      }
    }
    this.currentPlayer = 'X';
    this.winner = false;
    this.cat = false;
  },

  togglePlayer: function() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  },

  move: function(r, c) {
    this.board[r][c] = this.currentPlayer;
  },

  checkForMatch: function(cell1, cell2, cell3) {
    return cell1 === cell2 && cell1 === cell3 && cell1 !== '?';
  },

  isBoardFull: function() {
    for (var r = 0; r < this.board.length; r++) {
      let row = this.board[r];
      for (var c = 0; c < row.length; c++) {
        if (this.board[r][c] === '?') {
          return false;
        }
      }
    }
    return true;
  },

  checkForEndOfGame: function() {
    let rowMatch = this.checkForMatch(this.board[0][0], this.board[0][1], this.board[0][2])
                || this.checkForMatch(this.board[1][0], this.board[1][1], this.board[1][2])
                || this.checkForMatch(this.board[2][0], this.board[2][1], this.board[2][2]);
    let colMatch = this.checkForMatch(this.board[0][0], this.board[1][0], this.board[2][0])
                || this.checkForMatch(this.board[0][1], this.board[1][1], this.board[2][1])
                || this.checkForMatch(this.board[0][2], this.board[1][2], this.board[2][2]);
     let diagMatch = this.checkForMatch(this.board[0][0], this.board[1][1], this.board[2][2])
                  || this.checkForMatch(this.board[2][0], this.board[1][1], this.board[0][2]);
     this.winner = rowMatch || colMatch || diagMatch;
     this.cat = !this.winner && this.isBoardFull();
     return this.winner || this.cat;
  }
};
```
