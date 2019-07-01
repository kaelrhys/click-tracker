import React from 'react'
import { Redirect } from "react-router-dom";
import API from './api';
import './App.css'

class Landing extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: false 
        }
    }
    
    _setRedirect = () => {
        // Create a new session and get ID for redirect
        API.get('/new/')
        .then((response) => {
          if (response.data.id) {
            this.setState({ sessionId: response.data.id, redirect: true, });
            console.log(this.state)
          }
        })
        .catch((error) => {
          console.log(error)
        });
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to={`/session/${this.state.sessionId}` } />
        }
        return (
            <div className="landing">
                <div className="landing-box">
                    <h1>Welcome to Click Tracker</h1>
                    <button className="button" onClick={this._setRedirect}>Start a new session</button>
                </div>
            </div>
        )
    }
}

export default Landing