import React from 'react'
import { Redirect } from "react-router-dom";
import API from './api';


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
            <div>
                <h1>Landing</h1>
                <button onClick={this._setRedirect}>Start</button>
            </div>
        )
    }
}

export default Landing