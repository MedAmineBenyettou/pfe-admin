import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
 rootReducer,
 initialState,
 composeWithDevTools(applyMiddleware(...middleware))
);

export type AppDispatch = typeof store.dispatch;
const state = store.getState();
export type AppState = typeof state;

export default store;
