export const addSelectedToStore = (value)=>(dispatch)=>{
    dispatch({
        type: 'ADD_SELECTED',
        payload: value
    });
};

export const updateSelectedStoreToStore = (storeId) => (dispatch)=>{
    dispatch({
        type: 'UPDATE_SELECTED_STORE_TO_STORE',
        payload: storeId
    });
};






