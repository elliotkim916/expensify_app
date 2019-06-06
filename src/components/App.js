import React from 'react';
import {Router, Route} from 'react-router-dom';
import history from '../../history';
import Dashboard from './dashboard';
import AddExpense from './addExpense';
import EditExpense from './editExpense';

export default class App extends React.Component {
  render() {
    return (
    <div className="App">
      <h1>Expensify</h1>
      <Router history={history}>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/addExpense" component={AddExpense}/>
        <Route exact path="/editExpense" component={EditExpense}/>
      </Router>
    </div>
    );
  }
}