import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AuthActions from '../actions/auth'
import { Link } from 'react-router';

class Auth extends React.Component{
  componentDidMount() {
    // parse fitbit auth-data
    const parameters = this.props.location.hash.slice(1).split(/[=&]/);
    let values = Object.create(null);
    for(let i = 0; i < parameters.length; i += 2){
      // check for fitbit scope special case
      if(typeof parameters[i+1] === 'string' && parameters[i+1].includes('+')){
        // scopes will be stored as array
        values[parameters[i]] = parameters[i+1].split('+');
      } else {
        values[parameters[i]] = parameters[i+1];
      }
    }
    // save auth in the store
    this.props.actions.storeAuthData(values);
    // transition to dashboard
    this.props.router.push('dashboard');
  }

  render(){
    return(
      <div>
        <h1>Login successful!</h1>
        <h2>please click on the following link if you didnt get redirected yet: <Link to="/dashboard">to dashboard!</Link></h2>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(Auth);
