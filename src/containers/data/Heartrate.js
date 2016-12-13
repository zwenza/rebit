import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as DataActions from '../../actions/data'

class Heartrate extends React.Component{
  constructor(props){
    super(props);
  }

  loadHeartRateData = () => {
    const { user_id, access_token } = this.props.auth;
    this.props.actions.fetchHeartRateData(user_id, access_token);
  }

  render(){
    return(
      <div>
        <h2>Fetch your heartrate!</h2>
        <button onClick={this.loadHeartRateData}>Fetch</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(DataActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Heartrate);
