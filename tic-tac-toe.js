// The Tic-Tac-Toe Game (Model)

let game = {
  board: [
    ['?', '?', '?'],
    ['?', '?', '?'],
    ['?', '?', '?']
  ],
  currentPlayer: 'X',

  reset: function() {
    for (let r = 0; r < this.board.length; r++) {
      let row = this.board[r];
      for (let c = 0; c < row.length; c++) {
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

  isBoardFull: function() {
    for (let r = 0; r < this.board.length; r++) {
      let row = this.board[r];
      for (let c = 0; c < row.length; c++) {
        if (this.board[r][c] === '?') {
          return false;
        }
      }
    }
    return true;
  },

  checkForMatch: function(cell1, cell2, cell3) {
    return cell1 === cell2 && cell1 === cell3 && cell1 !== '?';
  },

  checkRows: function() {
    for (let r = 0; r < this.board.length; r++) {
      let row = this.board[r];
      if (this.checkForMatch(row[0], row[1], row[2])) {
        return true;
      }
    }
    return false;
  },

  checkColumns: function() {
    for (let c = 0; c < this.board[0].length; c++) {
      if (this.checkForMatch(this.board[0][c], this.board[1][c], this.board[2][c])) {
        return true;
      }
    }
    return false;
  },

  checkDiagonals: function() {
    return this.checkForMatch(this.board[0][0], this.board[1][1], this.board[2][2])
        || this.checkForMatch(this.board[2][0], this.board[1][1], this.board[0][2]);
  },

  checkForEndOfGame: function() {
    let rowMatch = this.checkRows();
    let colMatch = this.checkColumns();
     let diagMatch = this.checkDiagonals();
     this.winner = rowMatch || colMatch || diagMatch;
     this.cat = !this.winner && this.isBoardFull();
     return this.winner || this.cat;
  }
};
