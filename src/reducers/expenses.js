import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
  FILTER_EXPENSE,
  FILTER_BY_DATES,
  EXPENSE_ERROR
} from '../actions/expenses';

const initialState = {
  expenses: [],
  loading: false,
  error: null
}

export function expensesReducer(state=initialState, action) {
  if (action.type === ADD_EXPENSE) {
    return Object.assign({}, state, {
      expenses: [action.expense, ...state.expenses]
    });
  } else if (action.type === UPDATE_EXPENSE) {
    return Object.assign({}, state, 
      state.expenses.splice(action.index, 1, action.editedExpense)
    );
  } else if (action.type === FILTER_EXPENSE) {
    // why isnt this working properly?
    return Object.assign({}, state, {
      expenses: state.expenses.filter(expense => expense.title.toLowerCase().includes(action.title.toLowerCase()))
    });
  } else if (action.type === FILTER_BY_DATES) {
    console.log(state);
    console.log(action);
    // why isnt this working properly?
    return Object.assign({}, state, {
      expenses: state.expenses.filter(expense => expense.date >= action.startDate && expense.date <= action.endDate)
    });
  } else if (action.type === DELETE_EXPENSE) {
    return Object.assign({}, state, {
      expenses: state.expenses.filter(expense => expense.id !== action.id)
    })
  } else if (action.type === EXPENSE_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}