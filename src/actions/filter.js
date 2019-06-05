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


export const filterExpenses = title => dispatch => {
  return dispatch(filterExpense(title));
}

export const filterExpensesByDates = (startDate, endDate) => dispatch => {
  return dispatch(filterByDates(new Date(startDate).getTime(), new Date(endDate).getTime()));
}