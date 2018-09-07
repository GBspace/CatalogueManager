import {fetchStores as fetchStoresApi,
        fetchPhoneById as fetchPhoneByIdApi,
        fetchCategories  as fetchCategoriesApi}  from '../api/fetchStores';
import {getRenderedStoresLength} from '../selectors/Stores';

export const fetchStores = ()=>{
    
    return async (dispatch) => {
        try{
            dispatch({
                type: 'FETCH_STORE_START'
            });
            const stores = await fetchStoresApi();
            dispatch({
                type: 'FETCH_STORE_SUCCESS',
                payload: stores
            });
        }catch(err){
            dispatch({
                type: 'FETCH_STORE_FAIL',
                payload: err,
                error: true
            });
        };
    };
};

export const fetchCategories = ()=>{
    
    return async (dispatch,getState)=>{
        // console.log("Fetching entire state ", getState());
        try{
            dispatch({
                type: 'FETCH_CATEGORIES_START'
            });
            const categories = await fetchCategoriesApi();
            dispatch({
                type: 'FETCH_CATEGORIES_SUCCESS',
                payload: categories
            });
        }catch(err){
            dispatch({
                type: 'FETCH_CATEGORIES_FAILURE',
                payload: err,
                error: true
            });
        };
    };
}; 



export const fetchPhoneById = id=>{
    return async (dispatch,getState) => {
        const offset = getRenderedStoresLength(getState());
        try{
            dispatch({
                type: 'FETCH_STORE_BY_ID_START'
            });
            const store = await fetchPhoneByIdApi(id);
            dispatch({
                type: 'FETCH_STORE_BY_ID_SUCCESS',
                payload: store
            });
        }catch(err){
            dispatch({
                type: 'FETCH_STORE_BY_ID_FAILURE',
                payload: err,
                error: true
            });
        };
    };
};

export const addPhoneToBasket = id => dispatch => {
    dispatch({
        type: 'ADD_STORE_TO_BASKET',
        payload: id
    });
};

export const searchPhone = text => dispatch =>{
    console.log("searching ", text);
    dispatch({
        type: 'SEARCH_STORE',
        payload: text.toLowerCase()
    })};


export const reOrderStores = value =>dispatch => {
    dispatch({
        type: 'REORDER_STORES',
        payload: value
    });
};



