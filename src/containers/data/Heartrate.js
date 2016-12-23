import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as DataActions from '../../actions/data'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts'
import _ from 'lodash'
import { Tabs, Card, Icon, Radio, Alert, Spin } from 'antd'
import styled from 'styled-components'

const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

/* styling components */
const CardHeader = styled.div`
  backgroundColor: #a50000;
  padding: 15px 0px 15px 15px;
  color: white;
  opacity: 0.7;
`
const CardBody = styled.div`
  padding: 25px;
`
const CardContent = styled.div`
  text-align: center;
  padding-bottom: 25px;
`

class Heartrate extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      selectedTimeFrame: 'day'
    };
  }

  componentDidMount() {
    // check if we didn't load the heart-rate data yet
    if(_.isEmpty(this.extractHeartRateData())){
      this.props.actions.fetchHeartRateData('1d');
    }
  }

  /**
   * @returns mapped heart-rate data for displaying in the chart
   */
  extractHeartRateData = () => {
    //TODO also map other heart-rate data too (not just resting-rate)
    return _.map(this.props.data, (heartRateDay) => { return { restRate: heartRateDay.value.restingHeartRate, date: heartRateDay.dateTime } });
  }

  /**
   * @returns if every day in the selected time-frame doesnt have a record returns false else true
   */
  checkIfNoDataFound = extractedData => {
    return _.size(extractedData) === _.size(_.filter(extractedData, {restRate: undefined}));
  }

  /**
   * changes the current time-frame selection and fetches new data if time-frame has changed
   */
  changeTimeFrame = event => {
    event.preventDefault();

    if(this.props.dataTimeFrame !== event.target.value){
      let timeFrame;
      switch(event.target.value){
        case 'week': timeFrame = '1w'; break;
        case 'month': timeFrame = '1m'; break;
        case 'day':
        default: timeFrame = '1d';
      }

      this.props.actions.setDataTimeFrame(event.target.value);
      this.props.actions.fetchHeartRateData(timeFrame);
    }
  }

  renderRestingHeartRate = () => {
    const restingHeartRate = this.extractHeartRateData();

    return <TabPane tab="resting" key="1">
        {
          // check if there is data for the selected time-frame
          this.checkIfNoDataFound(restingHeartRate) ?
            // if not render error
            <Alert
              style={{textAlign: 'left'}}
              message="no data"
              description="We could't find any data for this time-frame. Are you sure that you synced your data?"
              type="warning"
              showIcon /> :
            // if there is data then check if data is currently loading
            !this.props.loading ?
              // if not loading render the data
              this.renderLineChart(restingHeartRate) :
              // if loading render a loading-spinner
              <Spin style={{padding: 25}} size="large" />
        }
    </TabPane>
  }

  renderLineChart = restingHeartRate => {
    return <ResponsiveContainer aspect={3}>
      <LineChart data={restingHeartRate}>
        <XAxis dataKey="date" />
        <YAxis domain={['dataMin-2', 'dataMax+2']} />
        <Line type="monotone" dataKey="restRate" stroke="#9b0000" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  }

  render(){
    return(
      <Card bodyStyle={{padding:0, borderColor:'green'}}>
        <CardContent>
          <CardHeader><Icon type="heart" /><b> heart-rate</b></CardHeader>

          <CardBody>
            <Tabs defaultActiveKey="1">
              { this.renderRestingHeartRate() }
            </Tabs>
          </CardBody>

          <RadioGroup onChange={this.changeTimeFrame} defaultValue={this.props.dataTimeFrame}>
            <RadioButton value="day">day</RadioButton>
            <RadioButton value="week">week</RadioButton>
            <RadioButton value="month">month</RadioButton>
          </RadioGroup>
        </CardContent>
      </Card>
    );
  }
}

Heartrate.defaultProps = {
  dataTimeFrame: 'day'
}

const mapStateToProps = state => {
  return {
    data: state.data['activities-heart'],
    loading: state.data.loading,
    dataTimeFrame: state.data.dataTimeFrame
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(DataActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Heartrate);
