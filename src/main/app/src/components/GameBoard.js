/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import { createGameBoard, clickGameCell } from '../data/modules/game';
import type { GameBoard as GameBoardType } from '../data/modules/game';
import './GameBoard.less';

type Props = {
  status: String,
  gameBoard: GameBoardType,
  gameBoardLatestData: Map,
  lastClicked: Map,
  createGameBoard: () => void,
  clickGameCell: () => void
};

class GameBoard extends React.Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      inputRows: 10, 
      inputCols: 10, 
      inputMines: 20,
      localGameBoard: [],
      gameStatus: "playing"
    };

    this.handleRowsChange = this.handleRowsChange.bind(this);
    this.handleColsChange = this.handleColsChange.bind(this);
    this.handleMinesChange = this.handleMinesChange.bind(this);
    this.handleCreateGameBoard = this.handleCreateGameBoard.bind(this);
    this.clickCell = this.clickCell.bind(this);
  }

  componentDidUpdate(prevProps) {
    // If there was no gameboard previously and there is one now, or if they have 
    // different names signalling a new game, then compute the local game board data.
    if ((!prevProps.gameBoard && this.props.gameBoard) || (prevProps.gameBoard && this.props.gameBoard.name !== prevProps.gameBoard.name)) {
      // TODO: if it's a new game, the local board
      this._computeLocalGameBoardData()
    }

    if (prevProps.gameBoardLatestData !== this.props.gameBoardLatestData) {
      this._updateLocalGameBoardData()
    }
  }

  clickCell(event, data) {
      const row = event.currentTarget.dataset.row;
      const col = event.currentTarget.dataset.col;
      this.props.clickGameCell(this.props.gameBoard.name, row, col);
  }

  _computeLocalGameBoardData() {
    const rows = [];

    const height = this.props.gameBoard.rows;
    const width = this.props.gameBoard.cols;

    var row;
    for (row = 0; row < height; row++) {
      var col;
      const cols = [];
      for (col = 0; col < width; col++) {
        const cellData = {
          mine: false,
          clicked: false,
          value: ""
        };
        cols.push(cellData)
      }
      rows.push(cols);
    }

    this.setState({
      localGameBoard: rows
    });
  }

  _updateLocalGameBoardData() {
    let localGameBoard = this.state.localGameBoard.concat([])
    let gameStatus = this.state.gameStatus;

    if (this.props.lastClicked) {
      localGameBoard[this.props.lastClicked.row][this.props.lastClicked.col] = this.props.gameBoardLatestData.Cell;
      localGameBoard[this.props.lastClicked.row][this.props.lastClicked.col] = this.props.gameBoardLatestData.Cell;

      if (this.props.gameBoardLatestData.Cell.mine) {
        console.log("HIT THE MINE!", this.props.gameBoardLatestData.Game.grid)
        localGameBoard = this.props.gameBoardLatestData.Game.grid;
        gameStatus = "over";
      }
    }

    this.setState({
      localGameBoard: localGameBoard,
      gameStatus: gameStatus
    });
  }

  _getGameBoardRows() {
    const rows = [];

    if (this.props.gameBoard && this.state.localGameBoard.length > 0) {
      // TODO: manage changes
      const height = this.props.gameBoard.rows;
      const width = this.props.gameBoard.cols;
      const isGameOver = this.state.gameStatus === "over";

      var row;
      for (row = 0; row < height; row++) {
        var col;
        const cols = [];
        for (col = 0; col < width; col++) {
          const cellData = this.state.localGameBoard[row][col];
          const isClicked = cellData.clicked;
          const isMine = cellData.mine;
          const cellValue = isClicked || isGameOver ? (isMine ? "*" : cellData.value) : "";

          cols.push(
            <div className={`game-cell ${isClicked ? "clicked" : "" } `} data-col={col} data-row={row} key={`cell-${row}-${col}`} onClick={this.clickCell}>
              <span>
                {cellValue}
              </span>
            </div>
          )
        }
        rows.push(
          <div key={`row-${row}`} className="game-row">
            {cols}
          </div>
        );
      }
    }

    return rows;
  }

  handleRowsChange(event) {
    this.setState({inputRows: event.target.value});
  }

  handleColsChange(event) {
    this.setState({inputCols: event.target.value});
  }

  handleMinesChange(event) {
    this.setState({inputMines: event.target.value});
  }

  handleCreateGameBoard(event) {
    event.preventDefault();
    this.props.createGameBoard(this.state.inputMines, this.state.inputCols, this.state.inputMines);
  }

  render() {
    const rows = this._getGameBoardRows();

    return (
      <div key="game-board" className="game-board">
        {rows}
        <form onSubmit={this.handleCreateGameBoard}>
            <label>
              Rows:
              <input type="text" value={this.state.inputRows} onChange={this.handleRowsChange} />
            </label>
            <label>
              Cols:
              <input type="text" value={this.state.inputCols} onChange={this.handleColsChange} />
            </label>
            <label>
              Mines:
              <input type="text" value={this.state.inputMines} onChange={this.handleMinesChange} />
            </label>
            <input type="submit" value="Create Game" />
          </form>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gameBoard: state.game.gameBoard,
    gameBoardLatestData: state.game.gameBoardLatestData,
    lastClicked: state.game.lastClicked
  };
}

export default connect(mapStateToProps, { createGameBoard, clickGameCell })(GameBoard);
