import React from 'react';
import ReactDOM from 'react-dom';

import logo from './logo.svg';
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      x: 0, 
      y: 0,
      clicks: [
        {top: 50, left: 50 },
        {top: 250, left: 150 },
      ],
    };
  }

  _undoClick(){
    // Filter all todos except the one to be removed
    if (this.state.clicks.length != 0) {
      this.state.clicks.pop();
      this.setState(this.state);
    } else {
      alert("No more clicks.")
    }
  }

  _addClick(e) {
    const position = ReactDOM.findDOMNode(this).getBoundingClientRect();
    this.state.clicks.push({top: e.nativeEvent.offsetY, left: e.nativeEvent.offsetX });
    this.setState(this.state);
  }

  render() {
    const clicks = this.state.clicks;

    return (
      <div ref="elem" className="container">
        <div className="canvas" onClick={this._addClick.bind(this)} >
          {
            clicks.map((click, index) => <div className="dot" key={index} style={{ top: click.top+'px', left: click.left+'px', }}></div>)
          }
        </div>
        <button onClick={this._undoClick.bind(this)}>Undo Click</button>
      </div>
    );
  }

}

export default App;
