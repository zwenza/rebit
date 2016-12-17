import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as DataActions from '../../actions/data'
import { LineChart, Line } from 'recharts'
import _ from 'lodash'

class Heartrate extends React.Component{
  constructor(props){
    super(props);
  }

  loadHeartRateData = () => {
    const { user_id, access_token } = this.props.auth;
    this.props.actions.fetchHeartRateData(user_id, access_token);
  }

  extractRestingHeartRate = () => {
    return _.map(this.props.data, function(heartRateDay) {
      return { restRate: heartRateDay.value.restingHeartRate };
    });
  }

  render(){
    const restingHeartRate = this.extractRestingHeartRate();

    return(
      <div>
        <h2>Fetch your heartrate!</h2>
        <button onClick={this.loadHeartRateData}>Fetch</button>
        <h3>resting heart-rate</h3>
        <LineChart width={730} height={500} data={restingHeartRate}>
          <Line type="monotone" dataKey="restRate" stroke="#8884d8" />
        </LineChart>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    data: state.data['activities-heart']
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(DataActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Heartrate);
