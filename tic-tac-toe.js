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
