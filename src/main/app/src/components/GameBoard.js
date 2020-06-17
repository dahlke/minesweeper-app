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
      const x = e.currentTarget.dataset.x
      const y = e.currentTarget.dataset.y
  }

  _getGameBoardRows() {

    let gameBoardSpec = {"success":true,"status":201,"result":{"name":"teste","rows":10,"cols":8,"mines":20,"status":"new"}}
    // let samplePlayResp = {"success":true,"status":200,"result":{"Cell":{"mine":true,"clicked":true,"value":1},"Game":{"name":"teste","rows":10,"cols":8,"mines":20,"status":"over","grid":[[{"mine":false,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":2},{"mine":true,"clicked":false,"value":2},{"mine":false,"clicked":false,"value":3},{"mine":true,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":0},{"mine":false,"clicked":false,"value":0}],[{"mine":false,"clicked":false,"value":1},{"mine":true,"clicked":true,"value":1},{"mine":false,"clicked":false,"value":3},{"mine":true,"clicked":false,"value":2},{"mine":false,"clicked":false,"value":2},{"mine":false,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":0},{"mine":false,"clicked":false,"value":0}],[{"mine":false,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":3},{"mine":false,"clicked":false,"value":2},{"mine":false,"clicked":false,"value":2},{"mine":false,"clicked":false,"value":0},{"mine":false,"clicked":false,"value":0},{"mine":false,"clicked":false,"value":0}],[{"mine":false,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":2},{"mine":true,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":2},{"mine":false,"clicked":false,"value":0},{"mine":false,"clicked":false,"value":0},{"mine":false,"clicked":false,"value":0}],[{"mine":true,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":2},{"mine":false,"clicked":false,"value":4},{"mine":true,"clicked":false,"value":2},{"mine":false,"clicked":false,"value":3},{"mine":false,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":1}],[{"mine":false,"clicked":false,"value":3},{"mine":true,"clicked":false,"value":2},{"mine":false,"clicked":false,"value":3},{"mine":true,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":2},{"mine":false,"clicked":false,"value":1},{"mine":true,"clicked":false,"value":0},{"mine":false,"clicked":false,"value":1}],[{"mine":true,"clicked":false,"value":2},{"mine":false,"clicked":false,"value":4},{"mine":false,"clicked":false,"value":3},{"mine":false,"clicked":false,"value":2},{"mine":false,"clicked":false,"value":2},{"mine":false,"clicked":false,"value":2},{"mine":false,"clicked":false,"value":3},{"mine":false,"clicked":false,"value":2}],[{"mine":true,"clicked":false,"value":2},{"mine":false,"clicked":false,"value":4},{"mine":true,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":2},{"mine":false,"clicked":false,"value":2},{"mine":true,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":3},{"mine":true,"clicked":false,"value":1}],[{"mine":true,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":3},{"mine":false,"clicked":false,"value":2},{"mine":true,"clicked":false,"value":2},{"mine":false,"clicked":false,"value":3},{"mine":false,"clicked":false,"value":4},{"mine":true,"clicked":false,"value":3},{"mine":false,"clicked":false,"value":3}],[{"mine":false,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":2},{"mine":true,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":3},{"mine":true,"clicked":false,"value":1},{"mine":false,"clicked":false,"value":2}]]}}}

    const height = gameBoardSpec["result"]["rows"];
    const width = gameBoardSpec["result"]["cols"];
    const rows = [];

    var i;
    for (i = 0; i < height; i++) {
      var j;
      const cols = [];
      for (j = 0; j < width; j++) {
        
        cols.push(<div className="game-cell" data-x={j} data-y={i} key={`cell-${i}-${j}`} onClick={this._clickCell} />)
      }
      rows.push(
        <div key={`row-${i}`} className="game-row">
          {cols}
        </div>
      );
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
    console.log(this.state);
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
  };
}

export default connect(mapStateToProps, { createGameBoard })(GameBoard);
