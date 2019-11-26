import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import { Router } from 'react-router';
import history from './utils/history.js';
import BasicLayout from './components/basic-layout/index'
import { authRoutes, noAuthRoutes } from './config/routes'

// import routes from './config/routes';
import './index.less';

 

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {noAuthRoutes.map((route, index) => {
            return <Route {...route} key={index} />
          })}
          <BasicLayout>
            <Switch>
              {/* Switch保证只有一个生效 */}
              {
                authRoutes.map((route, index) => {
                  // return <Route path={route.path} Component={route.path} />
                  return <Route {...route} key={index} />
                })
              }
            </Switch>
          </BasicLayout>
        </Switch>
      </Router>
    )
  }
}
