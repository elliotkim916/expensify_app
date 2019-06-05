import React from 'react';
import {connect} from 'react-redux';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker, SingleDatePicker} from 'react-dates';
import {editExpense, removeExpense} from '../actions/expenses';
import {filterExpenses, filterExpensesByDates} from '../actions/filter';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
      index: null,
      isEditing: false,
      date: null,
      title: '',
      description: '',
      amount: '',
      notes: ''
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
      date: new Date(this.state.date).getTime(),
      notes: this.state.notes
    };
    const index = this.state.index;
    this.props.dispatch(editExpense(index, editedExpense));
    this.setState({isEditing: false});
  }

  setValues(index) {
    this.setState({
      index: index,
      title: this.props.expenses[index].title,
      description: this.props.expenses[index].description,
      amount: this.props.expenses[index].amount,
      notes: this.props.expenses[index].notes
    });
  }

  render() {
    let expenses = '';
    if (this.props.expenses.length > 0 || (this.props.startDate > 0 && this.props.endDate > 0)) {
      expenses = this.props.expenses
        .filter(expense => expense.title.toLowerCase().includes(this.props.filter))
        .map((expense, index) => 
          <div key={index}>
            <button type="button" onClick={() => this.props.dispatch(removeExpense(expense.id))}>X</button>
            <button type="button" onClick={() => {
              this.setState({isEditing: true});
              this.setValues(index);
            }}>
            Edit Expense
            </button>
            <p>{expense.date}</p>
            <h3>{expense.title}</h3>
            <p>{expense.description}</p>
            <p>{expense.amount}</p>
            <p>{expense.notes}</p>
          </div>
      );
    }

    if (this.props.startDate > 0 && this.props.endDate > 0) {
      expenses = this.props.expenses
        .filter(expense => expense.date >= this.props.startDate && expense.date <= this.props.endDate)
        .map((expense, index) => 
          <div key={index}>
            <button type="button" onClick={() => this.props.dispatch(removeExpense(expense.id))}>X</button>
            <button type="button" onClick={() => {
              this.setState({isEditing: true});
              this.setValues(index);
            }}>
            Edit Expense
            </button>
            <p>{expense.date}</p>
            <h3>{expense.title}</h3>
            <p>{expense.description}</p>
            <p>{expense.amount}</p>
            <p>{expense.notes}</p>
          </div>
      );
    }

    if (this.state.isEditing) {
      return (
        <div>
          <form onSubmit={(e) => this.onSubmit(e)}>
            <button 
              type="button" 
              onClick={() => {
              this.props.dispatch(removeExpense(this.props.expenses[this.state.index].id));
              this.setState({isEditing: false});
              }}
            >X</button>
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
            <button type="button" onClick={() => this.setState({isEditing: false})}>Cancel</button>
          </form>
        </div>
      );
    }

    return (
      <div id="dashboard">
        <DateRangePicker 
          startDate={this.state.startDate}
          startDateId="start-date-id"
          endDate={this.state.endDate}
          endDateId="end-date-id"
          onDatesChange={({startDate, endDate}) => {
            this.setState({startDate, endDate});
            this.props.dispatch(filterExpensesByDates(startDate, endDate));
          }}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({focusedInput})}
        />
        <h3>All Expenses</h3>
        <input 
          type="text" 
          id="filter-expenses" 
          placeholder="Filter Expenses by Title" 
          onChange={e => this.props.dispatch(filterExpenses(e.target.value))}
        ></input>
        <button type="button" onClick={() => this.props.history.push('/addExpense')}>Add A New Expense</button><br/><br/>

        <div id="allExpenses">{expenses}</div>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  expenses: state.expensesReducer.expenses,
  filter: state.filtersReducer.filter,
  startDate: state.filtersReducer.startDate,
  endDate: state.filtersReducer.endDate
});

export default connect(mapStateToProps)(Dashboard);