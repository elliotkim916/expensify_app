import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {expensesReducer} from './reducers/expenses';
import {filtersReducer} from './reducers/filter';

const store = createStore(combineReducers({
    expensesReducer: expensesReducer,
    filtersReducer: filtersReducer
  }), 
  applyMiddleware(thunk.withExtraArgument(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
);

export default store;