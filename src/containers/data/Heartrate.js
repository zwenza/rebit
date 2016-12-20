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

  componentDidMount() {
    // check if we didn't load the heart-rate data yet
    if(_.isEmpty(this.extractRestingHeartRate())){
      const { user_id, access_token } = this.props.auth;
      this.props.actions.fetchHeartRateData(user_id, access_token);
    }
  }

  /**
   * @returns mapped heart-rate data for displaying in the chart
   */
  extractHeartRateData = () => {
    //TODO also map other heart-rate data too (not just resting-rate)
    return _.map(this.props.data, (heartRateDay) => { return { restRate: heartRateDay.value.restingHeartRate } });
  }

  render(){
    const restingHeartRate = this.extractHeartRateData();

    return(
      <div>
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
