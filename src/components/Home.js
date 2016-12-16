import React from 'react'
import { config } from '../constants/FitbitConfig'
import { Row, Col, Button, Card } from 'antd'

export default class Home extends React.Component{
  constructor(){
      super();

      this.state = {
        fitbiturl:  `https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=${config.client_id}` +
                    `&redirect_uri=${config.redirect_uri}&scope=${config.scope}&expires_in=${config.expires_in}`
      }
  }

  redirectToFitbit = () => {
    window.location = this.state.fitbiturl;
  }

  render(){
    return(
      <div>
        <Row>
          <Col offset={9} span={6}>
            <br/>
            <Card>
                <h1>Rebit</h1>
                <p>a better way to read your fitness data</p>
                <br/>
                <Button type="primary" onClick={this.redirectToFitbit}>login with fitbit</Button>
              </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
