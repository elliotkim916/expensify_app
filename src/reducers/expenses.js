import {
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  FILTER_EXPENSE,
  SET_INDEX,
  DELETE_EXPENSE
} from '../actions/expenses';

const initialState = {
  expenses: [],
  index: null
};

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
  } else if (action.type === SET_INDEX) {
    return Object.assign({}, state, {
      index: action.index
    });
  } else if (action.type === DELETE_EXPENSE) {
    return Object.assign({}, state, {
      expenses: state.expenses.filter(expense => expense.id !== action.id)
    });
  }
  return state;
}