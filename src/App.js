import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Bart from './pages/Bart'
import Index from './pages/Index'

import './styles/App.sass'

class App extends Component {
  render () {
    return (
      <Router>
        <React.Fragment>
          <Route exact path='/' component={Index} />
          <Route path='/bart' component={Bart} />
        </React.Fragment>
      </Router>
    )
  }
}

export default App
