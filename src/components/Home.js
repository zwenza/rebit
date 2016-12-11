import React from 'react'
import { config } from '../constants/FitbitConfig'

export default class Home extends React.Component{
  constructor(){
      super();

      this.state = {
        fitbiturl:  "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=" + config.client_id +
                    "&redirect_uri=" + config.redirect_uri +
                    "&scope=" + config.scope +
                    "&expires_in=" + config.expires_in
      }
  }

  render(){
    return(
      <div>
        <h1>Rebit</h1>
        <a href={this.state.fitbiturl}>Login with Fitbit!</a>
      </div>
    );
  }
}
