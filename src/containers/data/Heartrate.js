import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as DataActions from '../../actions/data'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts'
import _ from 'lodash'
import { Tabs, Card, Icon } from 'antd'

const TabPane = Tabs.TabPane;

class Heartrate extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {
    // check if we didn't load the heart-rate data yet
    if(_.isEmpty(this.extractHeartRateData())){
      const { user_id, access_token } = this.props.auth;
      this.props.actions.fetchHeartRateData(user_id, access_token);
    }
  }

  /**
   * @returns mapped heart-rate data for displaying in the chart
   */
  extractHeartRateData = () => {
    //TODO also map other heart-rate data too (not just resting-rate)
    return _.map(this.props.data, (heartRateDay) => { return { restRate: heartRateDay.value.restingHeartRate, date: heartRateDay.dateTime } });
  }

  render(){
    const restingHeartRate = this.extractHeartRateData();

    return(
      <div>
        <Card title="heart-rate" extra={<Icon type="heart" />}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="resting" key="1">
              <ResponsiveContainer aspect={3}>
                <LineChart data={restingHeartRate}>
                  <XAxis dataKey="date" />
                  <YAxis domain={['dataMin', 'dataMax']} />
                  <Line type="monotone" dataKey="restRate" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </TabPane>
          </Tabs>
        </Card>
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
