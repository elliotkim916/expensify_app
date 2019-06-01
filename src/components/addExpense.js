import React from 'react';
import {connect} from 'react-redux';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {SingleDatePicker} from 'react-dates';
import {addNewExpense} from '../actions/expenses';
import uuid from 'uuid';

export class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      amount: '',
      date: null,
      notes: ''
    };
  }

  titleInput(e) {
    this.setState({title: e.target.value});
  }
  descriptionInput(e) {
    this.setState({description: e.target.value});
  }
  amountInput(e) {
    this.setState({amount: e.target.value});
  }
  notesInput(e) {
    this.setState({notes: e.target.value});
  }
  
  onSubmit(e) {
    e.preventDefault();
    const expense = {
      title: this.state.title,
      description: this.state.description,
      amount: this.state.amount,
      date: Date.now(this.state.date),
      notes: this.state.notes,
      id: uuid.v4()
    };
    this.props.dispatch(addNewExpense(expense));
    this.props.history.push('/');
  }

  render() {
    return (
      <div id="addExpense">
        <button type="button" onClick={() => this.props.history.push('/')}>Home</button><br/><br/>

        <h1>Add Expense</h1>
        
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input type="text" id="title" placeholder="Enter title" onChange={e => this.titleInput(e)}></input><br/><br/>
          <input type="text" id="description" placeholder="Enter description" onChange={e => this.descriptionInput(e)}></input><br/><br/>
          <input type="number" id="amount" placeholder="Enter amount" onChange={e => this.amountInput(e)}></input><br/><br/>
          <SingleDatePicker
            date={this.state.date} 
            onDateChange={date => this.setState({ date })} 
            focused={this.state.focused} 
            onFocusChange={({ focused }) => this.setState({ focused })} 
            id="expense_date_id" 
          /><br/><br/>
          <textarea id="notes" placeholder="Enter any notes" onChange={e => this.notesInput(e)}></textarea><br/><br/>
          <button type="submit">Add New Expense</button>
        </form>
      </div>
    );
  }
}

export default connect()(AddExpense);