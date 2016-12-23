import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as DataActions from '../../actions/data'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts'
import _ from 'lodash'
import { Tabs, Card, Icon, Radio, Alert, Spin } from 'antd'
import styled from 'styled-components'
import { DatePicker } from 'antd'
import moment from 'moment'
import enUS from 'antd/lib/date-picker/locale/en_US';

const { RangePicker } = DatePicker;
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
      if(!_.isEmpty(this.props.dataTimeFrame)){
        this.props.actions.fetchHeartRateData(this.props.dataTimeFrame);
      } else {
        this.props.actions.setDataTimeFrame([moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]);
        this.props.actions.fetchHeartRateData([moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]);
      }
    }
  }

  /**
   * @returns mapped heart-rate data for displaying in the chart
   */
  extractHeartRateData = () => {
    if(_.isEmpty(this.props.data)){
      return;
    }

    if(moment(this.props.dataTimeFrame[1]).diff(moment(this.props.dataTimeFrame[0]), 'days') > 1){
        return _.map(this.props.data, heartRateForIntervall => { return { heartRate: heartRateForIntervall.value.restingHeartRate } });
    }
    return _.map(this.props.data['dataset'], heartRateForIntervall => { return { heartRate: heartRateForIntervall.value } });
  }

  /**
   * @returns if every day in the selected time-frame doesnt have a record returns false else true
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
    if(this.props.dataTimeFrame[0] === formattedStart &&
    this.props.dataTimeFrame[1] === formattedEnd){
      return;
    }

    // if not refresh the selected time-frame and reload the heart-rate data
    this.props.actions.setDataTimeFrame([formattedStart, formattedEnd]);
    if(timeFrame[1].diff(timeFrame[0], 'days') > 1){
      this.props.actions.fetchHeartRateData([formattedStart, formattedEnd]);
    } else {
      this.props.actions.fetchHeartRateIntraDayData([formattedStart, formattedEnd]);
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
            <Tabs defaultActiveKey="1">
              { this.renderRestingHeartRate() }
            </Tabs>
          </CardBody>

          <RangePicker
            onChange={this.changeTimeFrame}
            locale={enUS}
            defaultValue={[moment(), moment()]}
            ranges={{ 'Today': [moment(), moment()],
              'This week': [moment().startOf('week'), moment().endOf('week')],
              'This month': [moment().startOf('month'), moment().endOf('month')] }}
            format="DD/MM/YYYY" />
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
    data: state.data['activities-heart-intraday'],
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
