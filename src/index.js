import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Router, Route, IndexRoute, browserHistory   } from 'react-router'
import Dashboard from './components/Dashboard'
import Auth from './containers/Auth'
import Home from './components/Home'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="dashboard" component={Dashboard}/>
        <Route path="auth" component={Auth}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
