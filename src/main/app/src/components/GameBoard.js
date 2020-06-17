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
      localGameBoard: []
    };

    this.handleRowsChange = this.handleRowsChange.bind(this);
    this.handleColsChange = this.handleColsChange.bind(this);
    this.handleMinesChange = this.handleMinesChange.bind(this);
    this.handleCreateGameBoard = this.handleCreateGameBoard.bind(this);
    this.clickCell = this.clickCell.bind(this);
  }

  componentDidUpdate(prevProps) {
    // TODO: do this as well if there is an update to gameBoardLatestData
    console.log("update", prevProps.gameBoard, this.props.gameBoard);
    if (prevProps.gameBoard) {
      console.log(prevProps.gameBoard);
      console.log(this.props.gameBoard);
    }
    if (
      (!prevProps.gameBoard || this.props.gameBoard.name !== prevProps.gameBoard.name) ||
      (prevProps.gameBoardLatestData != this.props.gameBoardLatestData)
    ) {
      console.log("game board changed");
      this._computeLocalGameBoardData()
    }
  }

  clickCell(event, data) {
      const row = event.currentTarget.dataset.row;
      const col = event.currentTarget.dataset.col;
      this.props.clickGameCell(this.props.gameBoard.name, row, col);
  }

  _computeLocalGameBoardData() {
    const rows = [];

    console.log("compute local data");
    if (this.props.gameBoard) {
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
    }

    this.setState({
      localGameBoard: rows
    });
  }

  _getGameBoardRows() {
    const rows = [];

    if (this.props.gameBoard) {
      // TODO: manage changes
      console.log("build board ui", this.props.gameBoard, this.props.gameBoardLatestData);
      const height = this.props.gameBoard.rows;
      const width = this.props.gameBoard.cols;

      var row;
      for (row = 0; row < height; row++) {
        var col;
        const cols = [];
        for (col = 0; col < width; col++) {
          cols.push(<div className="game-cell" data-col={col} data-row={row} key={`cell-${row}-${col}`} onClick={this.clickCell} />)
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
    gameBoardLatestData: state.game.gameBoardLatestData
  };
}

export default connect(mapStateToProps, { createGameBoard, clickGameCell })(GameBoard);
