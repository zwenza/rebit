import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import _ from 'lodash'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts'
import { Card, Icon, Alert, Spin, DatePicker } from 'antd'
import enUS from 'antd/lib/date-picker/locale/en_US';

import * as DataActions from '../../actions/data'

const { RangePicker } = DatePicker;

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
  }

  componentDidMount() {
    // check if we didn't load the heart-rate data yet
    if(_.isEmpty(this.extractHeartRateData())){
      this.props.actions.fetchHeartRateData(this.props.dataTimeFrame);
    }
  }

  /**
   * @returns {array} mapped heart-rate data for displaying in the chart
   */
  extractHeartRateData = () => {
    if(_.isEmpty(this.props.data) && _.isEmpty(this.props.intradayData)){
      return;
    }

    if(this.shouldDisplayIntraday(this.props.dataTimeFrame[1], this.props.dataTimeFrame[0])){
      return _.map(this.props.intradayData['dataset'], heartRateForIntervall => { return { heartRate: heartRateForIntervall.value } });
    } else {
      return _.map(this.props.data, heartRateForIntervall => { return { heartRate: heartRateForIntervall.value.restingHeartRate } });
    }
  }

  /**
   * @returns {boolean} true: every day in the selected time-frame doesnt have a record
   */
  checkIfNoDataFound = extractedData => {
    return _.size(extractedData) === _.size(_.filter(extractedData, {heartRate: undefined}));
  }

  /**
   * changes the current time-frame selection and fetches new data if time-frame has changed
   */
  changeTimeFrame = timeFrame => {
    const formattedStart = timeFrame[0].format('YYYY-MM-DD');
    const formattedEnd = timeFrame[1].format('YYYY-MM-DD');

    // check if selected time-frame is equal to already selected time-frame
    if(this.props.dataTimeFrame[0].isSame(timeFrame[0]) && this.props.dataTimeFrame[1].isSame(timeFrame[1])){
      return;
    }

    // if not refresh the selected time-frame and reload the heart-rate data
    this.props.actions.setDataTimeFrame(timeFrame);
    if(this.shouldDisplayIntraday(timeFrame[1], timeFrame[0])){
      this.props.actions.fetchHeartRateIntraDayData([formattedStart, formattedEnd]);
    } else {
      this.props.actions.fetchHeartRateData([formattedStart, formattedEnd]);
    }
  }

  /**
   * returns if there is only one day difference between two dates to
   * decide if the data should be displayed as intraday or more days.
   * @param {moment} firstDay   first day - must be before secondDay
   * @param {moment} secondDay  second day
   * @returns {boolean} true: if diff is max. one day, false: if diff is more than one day
   */
  shouldDisplayIntraday = (firstDay, secondDay) => {
    return firstDay.diff(secondDay, 'days') <= 1;
  }

  renderHeartRate = () => {
    const heartRate = this.extractHeartRateData();

    if(this.checkIfNoDataFound(heartRate)){
      // if no data found render error
      return <Alert style={{textAlign: 'left'}}
                    message="no data"
                    description="We could't find any data for this time-frame. Are you sure that you synced your data?"
                    type="warning" showIcon />
    } else {
      // if there is data then check if data is currently loading
      if(!this.props.loading){
        // if not loading render the data
        return this.renderLineChart(heartRate)
      } else {
        // if loading render a loading-spinner
        return <Spin style={{padding: 25}} size="large" />
      }
    }
  }

  renderLineChart = heartRate => {
    return <ResponsiveContainer aspect={3}>
      <LineChart data={heartRate}>
        <XAxis />
        <YAxis domain={['dataMin-2', 'dataMax+2']} />
        <Line type="monotone" dataKey="heartRate" stroke="#9b0000" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  }

  render(){
    return(
      <Card bodyStyle={{padding:0, borderColor:'green'}}>
        <CardContent>
          <CardHeader><Icon type="heart" /><b> heart-rate</b></CardHeader>

          <CardBody>
            { this.renderHeartRate() }
          </CardBody>

          <RangePicker
            onChange={this.changeTimeFrame}
            locale={enUS}
            defaultValue={this.props.dataTimeFrame}
            ranges={{ 'Today': [moment(), moment()],
              'This week': [moment().startOf('week'), moment().endOf('week')],
              'This month': [moment().startOf('month'), moment().endOf('month')] }}
            format="DD/MM/YYYY" />
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data['activities-heart'],
    intradayData: state.data['activities-heart-intraday'],
    loading: state.data.loading,
    dataTimeFrame: Array.isArray(state.data.dataTimeFrame) ? [moment(state.data.dataTimeFrame[0]), moment(state.data.dataTimeFrame[1])] : [moment(), moment()]
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(DataActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Heartrate);
