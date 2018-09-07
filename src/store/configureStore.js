import {createStore, combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import storeReducer from '../reducers/store';
import StoresPage from '../reducers/StoresPage';
import StorePage from '../reducers/StorePage';
import {routerReducer} from 'react-router-redux';
import Categories from '../reducers/Categories';
import Order from '../reducers/Order';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default ()=>{
    const store = createStore(
        combineReducers({
            routing:routerReducer,
            store: storeReducer,
            StoresPage: StoresPage,
            StorePage: StorePage,
            Categories: Categories,
            Order:Order
        }),composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};