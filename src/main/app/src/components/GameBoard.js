/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import { createGameBoard } from '../data/modules/game';
import type { GameBoard as GameBoardType } from '../data/modules/game';
import './GameBoard.less';

type Props = {
  status: String,
  gameBoard: GameBoardType,
  createGameBoard: () => void
};

class GameBoard extends React.Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      inputName: "", 
      inputRows: 10, 
      inputCols: 10, 
      inputMines: 20
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRowsChange = this.handleRowsChange.bind(this);
    this.handleColsChange = this.handleColsChange.bind(this);
    this.handleMinesChange = this.handleMinesChange.bind(this);
    this.handleCreateGameBoard = this.handleCreateGameBoard.bind(this);

  }

  _clickCell(e, data) {
      const row = e.currentTarget.dataset.row;
      const col = e.currentTarget.dataset.col;
      console.log(row, col);
  }

  _getGameBoardRows() {
    const rows = [];
    console.log("build board", this.props);
    if (this.props.gameBoard) {
      const height = this.props.gameBoard.rows;
      const width = this.props.gameBoard.cols;

      var i;
      for (i = 0; i < height; i++) {
        var j;
        const cols = [];
        for (j = 0; j < width; j++) {
          
          cols.push(<div className="game-cell" data-col={j} data-row={i} key={`cell-${i}-${j}`} onClick={this._clickCell} />)
        }
        rows.push(
          <div key={`row-${i}`} className="game-row">
            {cols}
          </div>
        );
      }
    }

    return rows;
  }

  handleNameChange(event) {
    this.setState({inputName: event.target.value});
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
    console.log("handle create game board", this.props);
    this.props.createGameBoard(this.state.inputName, this.state.inputMines, this.state.inputCols, this.state.inputMines);
  }

  render() {
    const rows = this._getGameBoardRows();
    console.log("render");
    return (
      <div key="game-board" className="game-board">
        {rows}
        <form onSubmit={this.handleCreateGameBoard}>
            <label>
              Name:
              <input type="text" value={this.state.inputName} onChange={this.handleNameChange} />
            </label>
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
    gameBoard: state.game.gameBoard
  };
}

export default connect(mapStateToProps, { createGameBoard })(GameBoard);
