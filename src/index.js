import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory   } from 'react-router'
import Dashboard from './components/Dashboard'
import Auth from './containers/Auth'
import Home from './components/Home'
import _ from 'lodash'
import 'antd/dist/antd.css'

const requireAuthentication = (nextState, transition) => {
  if(_.isEmpty(store.getState().auth)){
    // transition to home if user is not authenticated
    transition('/');
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="dashboard" component={Dashboard} onEnter={requireAuthentication}/>
        <Route path="auth" component={Auth}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
