import React from 'react'
import Heartrate from '../containers/data/Heartrate'
import { Row, Col, Tabs, Card } from 'antd'

export default class Dashboard extends React.Component{
  render(){
    return(
      <div>
        <Row>
          <Col xs={{span: 22, offset:1}} sm={{span: 18, offset:3}} md={{span: 12, offset:6}} lg={{span: 10, offset:7}}>
            <br/>
            <h1>your dashboard</h1>
            <br/>
            <Heartrate />
          </Col>
        </Row>
      </div>
    );
  }
}
