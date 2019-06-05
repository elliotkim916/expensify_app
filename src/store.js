import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {expensesReducer} from './reducers/expenses';

const store = createStore(expensesReducer, applyMiddleware(thunk.withExtraArgument(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())));

export default store;