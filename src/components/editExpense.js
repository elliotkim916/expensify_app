import React from 'react';
import {connect} from 'react-redux';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {SingleDatePicker} from 'react-dates';
import {editExpense, removeExpense} from '../actions/expenses';

export class EditExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      title: this.props.expenses[this.props.index].title,
      description: this.props.expenses[this.props.index].description,
      amount: this.props.expenses[this.props.index].amount,
      notes: this.props.expenses[this.props.index].notes
    }
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
    const editedExpense = {
      title: this.state.title,
      description: this.state.description,
      amount: this.state.amount,
      date: this.state.date === null ? this.props.expenses[this.props.index].date : new Date(this.state.date).getTime(),
      notes: this.state.notes
    };
    const index = this.props.index;
    this.props.dispatch(editExpense(index, editedExpense));
    this.props.history.push('/');
  }

  render() {
    console.log(new Date(this.props.expenses[this.props.index].date));
    return (
       <div>
          <form onSubmit={(e) => this.onSubmit(e)}>
            <button 
              type="button" 
              onClick={() => {
                this.props.dispatch(removeExpense(this.props.expenses[this.props.index].id));
                this.props.history.push('/');
              }}>
            X
            </button>
            <input 
              type="text" 
              id="title" 
              placeholder="Edit title" 
              onChange={e => this.titleInput(e)} 
              value={this.state.title}
              ></input><br/><br/>
            <input 
              type="text" 
              id="description" 
              placeholder="Edit description"
              onChange={e => this.descriptionInput(e)} 
              value={this.state.description}
              ></input><br/><br/>
            <input 
              type="number" 
              id="amount" 
              placeholder="Edit amount"
              onChange={e => this.amountInput(e)} 
              value={this.state.amount}
              ></input><br/><br/>
            <SingleDatePicker
              date={this.state.date} 
              onDateChange={date => this.setState({ date })} 
              focused={this.state.focused} 
              onFocusChange={({ focused }) => this.setState({ focused })} 
              id="expense_date_id" 
            /><br/><br/>
            <textarea 
              id="notes" 
              placeholder="Edit notes"
              onChange={e => this.notesInput(e)} 
              value={this.state.notes}
            ></textarea><br/><br/>
            <button type="submit">Update Expense</button>
            <button type="button" onClick={() => this.props.history.push('/')}>Cancel</button>
          </form>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  expenses: state.expensesReducer.expenses,
  index: state.expensesReducer.index
});

export default connect(mapStateToProps)(EditExpense);