/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import './GameBoard.less';

type Props = {
};

class GameBoard extends React.Component<Props> {

  clickCell(e, data) {
      const x = e.currentTarget.dataset.x
      const y = e.currentTarget.dataset.y
      console.log(x, y);
  }

  getGameBoardRows() {
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
        
        cols.push(<div className="game-cell" data-x={j} data-y={i} key={`cell-${i}-${j}`} onClick={this.clickCell} />)
      }
      rows.push(
        <div key={`row-${i}`} className="game-row">
          {cols}
        </div>
      );
    }

    return rows;
  }

  render() {
    const rows = this.getGameBoardRows();
    return (
      <div key="game-board" className="game-board">
        {rows}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {})(GameBoard);
