import React from 'react'
import API from './api';
import './App.css'


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      session: {
        id: props.match.params.id,
        clicks: [],
        clicksThisSession: 0,
        totalClicks: 0,
      }
    }
  }


  async componentDidMount(props) {

    API.get(`/session/${this.state.session.id}`)
    .then((response) => {
      const session = {
        id: response.data.id || this.state.session.id,
        clicks: response.data.clicks || [],
        clicksThisSession: 0,
        totalClicks: 0
      }
      this.setState({session: session})
    })

  }

  _undoClick(){
    if (this.state.session.clicks.length !== 0) {
      this.state.session.clicks.pop()
      this.setState(this.state.session)
    } else {
      alert("No more clicks.")
    }
  }

  _addClick(e) {
    this.state.session.clicks.push({top: e.nativeEvent.offsetY, left: e.nativeEvent.offsetX });
    this.setState(this.state.session);
  }

  _saveSession(){
    API.post('/save/', this.state.session )
    .then((response) => {
      if (response.data.id) {
        alert("Session Saved")
        console.log(response.data)
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }


  render() {
    const session = this.state.session
    return (
      <div ref="elem" className="container">
        <div className="canvas" onClick={this._addClick.bind(this)} >
          {
            session.clicks.map((click, index) => <div className="dot" key={index} style={{ top: click.top+'px', left: click.left+'px', }}></div>)
          }
        </div>
        <button onClick={this._undoClick.bind(this)}>Undo Click</button>
        <button onClick={this._saveSession.bind(this)}>Save Session</button>
        <b>Total Clicks: { session.totalClicks }</b>
        <b>Clicks this Session: { session.clicksThisSession }</b>

      </div>
    );
  }

}

export default App;
