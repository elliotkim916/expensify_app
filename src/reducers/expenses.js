import {
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  FILTER_EXPENSE
} from '../actions/expenses';

const initialState = {
  expenses: []
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
  }
  return state;
}