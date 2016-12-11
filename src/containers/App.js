import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../actions/userActions'

class App extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <button onClick={this.props.actions.signIn}>Sign IN</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(UserActions, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(App);
