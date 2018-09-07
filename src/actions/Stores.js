import {fetchStores as fetchStoresApi,
        fetchCategories  as fetchCategoriesApi}  from '../api/fetchStores';


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


export const searchStore = text => dispatch =>{
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



