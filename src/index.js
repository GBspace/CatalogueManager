import './main.css'
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {browserHistory,Router,Route} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import Layout from './Containers/Layout';
import Stores from './Containers/Stores';
import Result from './Containers/Result';



const store = configureStore();
const history = syncHistoryWithStore(browserHistory,store);
const jsx = (
    <Provider store={store}>
       <Router history={history}>
            <Route component={Layout}>
                <Route path='/' component={Stores}></Route>
                <Route path='/categories/:id' component={Stores} />
            </Route>
            <Route path='/Result' component={Result} />
        </Router>
    </Provider>
);
ReactDOM.render(jsx,document.getElementById('root'));

