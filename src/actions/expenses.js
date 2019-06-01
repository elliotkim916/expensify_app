export const ADD_EXPENSE = 'ADD_EXPENSE';
export const addExpense = expense => ({
  type: ADD_EXPENSE,
  expense
});

export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const deleteExpense = id => ({
  type: DELETE_EXPENSE,
  id
});

export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const updateExpense = (index, editedExpense) => ({
  type: UPDATE_EXPENSE,
  index,
  editedExpense
});

export const FILTER_EXPENSE = 'FILTER_EXPENSE';
export const filterExpense = title => ({
  type: FILTER_EXPENSE,
  title
});

export const FILTER_BY_DATES = 'FILTER_BY_DATES';
export const filterByDates = (startDate, endDate) => ({
  type: FILTER_BY_DATES,
  startDate,
  endDate
});

export const EXPENSE_ERROR = 'EXPENSE_ERROR';
export const expenseError = error => ({
  type: EXPENSE_ERROR,
  error
});

export const addNewExpense = expense => dispatch => {
  const {title, description, amount, date, notes, id} = expense;
  return dispatch(addExpense(expense));
}

export const removeExpense = id => dispatch => {
  return dispatch(deleteExpense(id));
}

export const editExpense = (index, editedExpense) => dispatch => {
  const {title, description, amount, date, notes} = editedExpense
  return dispatch(updateExpense(index, editedExpense));
}

export const filterExpenses = title => dispatch => {
  return dispatch(filterExpense(title));
}

export const filterExpensesByDates = (startDate, endDate) => dispatch => {
  return dispatch(filterByDates(Date.now(startDate), Date.now(endDate)));
}