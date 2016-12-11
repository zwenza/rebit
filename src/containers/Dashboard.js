import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AuthActions from '../actions/auth'

class Dashboard extends React.Component{
  constructor(props){
    super(props);

    // parse fitbit auth-data
    //TODO move this to a better fitting location!
    const parameters = this.props.location.hash.slice(1).split(/[=&]/);
    let values = Object.create(null);
    for(let i = 0; i < parameters.length; i += 2){
      if(typeof parameters[i+1] === 'string' && parameters[i+1].includes('+')){
        values[parameters[i]] = parameters[i+1].split('+');
      } else {
        values[parameters[i]] = parameters[i+1];
      }
    }
    // save auth in the store
    this.props.actions.storeAuthData(values);
  }

  render(){
    return(
      <div>
        <h1>Logged in!</h1>
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
)(Dashboard);
