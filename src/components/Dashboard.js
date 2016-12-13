import React from 'react'
import Heartrate from '../containers/data/Heartrate'

export default class Dashboard extends React.Component{
  render(){
    return(
      <div>
        <h1>Dashboard!</h1>
        <Heartrate />
      </div>
    );
  }
}
