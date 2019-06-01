import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {expensesReducer} from './reducers/expenses';

const store = createStore(expensesReducer, applyMiddleware(thunk));

export default store;