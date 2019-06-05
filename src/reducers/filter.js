import {
  FILTER_EXPENSE,
  FILTER_BY_DATES
} from '../actions/filter';

const initialState = {
  filter: '',
  startDate: null,
  endDate: null
};

export function filtersReducer(state=initialState, action) {
  if (action.type === FILTER_EXPENSE) {
    return Object.assign({}, state, {
      filter: action.title.toLowerCase()
    });
  } else if (action.type === FILTER_BY_DATES) {
    return Object.assign({}, state, {
      startDate: action.startDate,
      endDate: action.endDate
    });
  }
  return state;
}