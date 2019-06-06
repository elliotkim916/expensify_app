import React from 'react';
import {connect} from 'react-redux';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker} from 'react-dates';
import {removeExpense, setIndex} from '../actions/expenses';
import {filterExpenses, filterExpensesByDates} from '../actions/filter';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null
    }
  }

  render() {
    let expenses = '';

    if (this.props.expenses.length > 0) {
      expenses = this.props.expenses
        .filter(expense => expense.title.toLowerCase().includes(this.props.filter))
        .map((expense, index) => 
          <div key={index}>
            <button type="button" onClick={() => this.props.dispatch(removeExpense(expense.id))}>X</button>
            <button type="button" onClick={() => {
              this.props.history.push('/editExpense');
              this.props.dispatch(setIndex(index));
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
              this.props.history.push('/editExpense');
              this.props.dispatch(setIndex(index));
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