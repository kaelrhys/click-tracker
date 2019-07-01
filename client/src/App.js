import React from 'react'
import API from './api';
import './App.css'
import { TwitterPicker } from 'react-color';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedColor: "#000",
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
      const clicks = response.data.clicks || []
      const totalClicks = clicks.length
      const session = {
        id: response.data.id || this.state.session.id,
        clicks: clicks,
        clicksThisSession: 0,
        totalClicks: totalClicks
      }
      console.log(response.data)
      this.setState({session: session})
    })
  }

  _undoClick(){
    if (this.state.session.clicks.length !== 0) {
      this.state.session.clicks.pop()
      this.state.session.totalClicks = this.state.session.totalClicks - 1
      this.state.session.clicksThisSession = this.state.session.clicksThisSession - 1
      this.setState(this.state.session)
    } else {
      alert("No more clicks.")
    }
  }

  _addClick(e) {
    this.state.session.clicks.push({top: e.nativeEvent.offsetY, left: e.nativeEvent.offsetX, color: this.state.selectedColor, });
    this.state.session.totalClicks = this.state.session.totalClicks + 1
    this.state.session.clicksThisSession = this.state.session.clicksThisSession + 1
    this.setState(this.state.session);
  }

  _saveSession(){
    console.log(this.state.session)
    API.post('/save/', this.state.session)
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

  _colorChange = (color) => {
    this.setState({ selectedColor: color.hex });
  };


  render() {
    const session = this.state.session
    return (
      <div ref="elem" className="container">
        <div className="dock">
          <div className="button-group">
            <button className="button" onClick={this._undoClick.bind(this)}>Undo Click</button>
            <button className="button" style={{marginLeft: "5px"}} onClick={this._saveSession.bind(this)}>Save Session</button>
          </div>
          
          <div className="session-info">
            <div className="color-picker">
              <span className="color-picker__label">Color:</span>
              <div className="color-picker__color" style={{ backgroundColor: this.state.selectedColor }} >
                <div className="color-picker__pallete">
                  <TwitterPicker
                    color={ this.state.selectedColor }
                    onChangeComplete={ this._colorChange }
                  />
                </div>
              </div>
            </div>
            <div className="session-info__clicks">
              <ul>
                <li>Total Clicks: { session.totalClicks }</li>
                <li>Clicks this Session: { session.clicksThisSession }</li>
              </ul>
            </div>
          </div>
          
        </div>

        <div className="canvas" onClick={this._addClick.bind(this)} >
          {
            session.clicks.map((click, index) => <div className="click" key={index} style={{ top: `${(click.top - 3)}px`, left: `${(click.left - 3)}px`, backgroundColor: click.color,  }}></div>)
          }
        </div>
      </div>
    );
  }
}

export default App;
