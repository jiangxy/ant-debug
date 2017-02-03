import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import App from './components/App';
import Hello from './components/Hello';
import HelloWithAffix from './components/HelloWithAffix';

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Hello}/>
      <Route path="aaa" component={HelloWithAffix}/>
    </Route>
  </Router> 
);

ReactDOM.render(routes, document.getElementById('root'));
