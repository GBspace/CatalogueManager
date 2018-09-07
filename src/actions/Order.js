export const addSelectedToStore = (value)=>(dispatch,getState)=>{
    // console.log(getState().StoresPage.ids);
    // console.log(getState().Categories);
    // const orderedOutput = {
    //     selectedStores: phnValue,
    //     // selectedCategories: catValue,
    //     orderdStores: getState().StoresPage.ids,
    //     orderedCat: getState().Categories
    // };
    // console.log("Value passed is ", value);
    dispatch({
        type: 'ADD_SELECTED',
        payload: value
    });
};

export const updateSelectedPhoneToStore = (storeId) => (dispatch)=>{
    dispatch({
        type: 'UPDATE_SELECTED_STORE_TO_STORE',
        payload: storeId
    });
};

export const persistSelectedItems=(value)=>dispatch=>{
    dispatch({
        type: 'PERSIST_SELECTED_TO_STORE',
        payload: value

    });
};


export const getSelectedStoresFromStore = ()=>dispatch => {
    dispatch({
        type: 'GET_SELECTED_STORES_FROM_STORE'
    });
};

