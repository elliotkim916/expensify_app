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
  filter: '',
  startDate: null,
  endDate: null,
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
    return Object.assign({}, state, {
      filter: action.title.toLowerCase()
    });
  } else if (action.type === FILTER_BY_DATES) {
    console.log(action);
    return Object.assign({}, state, {
      startDate: action.startDate,
      endDate: action.endDate
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