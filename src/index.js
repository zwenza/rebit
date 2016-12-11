import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Router, Route, IndexRoute, browserHistory   } from 'react-router'
import Dashboard from './containers/Dashboard'
import Home from './components/Home'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="dashboard" component={Dashboard}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
