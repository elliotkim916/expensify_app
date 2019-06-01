import React from 'react';
import {Router, Route} from 'react-router-dom';
import history from '../../history';
import Dashboard from './dashboard';
import AddExpense from './addExpense';

export default class App extends React.Component {
  render() {
    return (
    <div className="App">
      <h1>Expensify</h1>
      <Router history={history}>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/addExpense" component={AddExpense}/>
      </Router>
    </div>
    );
  }
}