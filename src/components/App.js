import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'

import Dashboard from './Dashboard'
class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading ? null : <Dashboard />}
      </div>
    )
  }
}

const mapStateTpProps = ({ authedUser }) => ({
  loading: authedUser === null
})

export default connect(mapStateTpProps)(App)