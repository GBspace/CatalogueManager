export const reorderCategories = value=> dispatch =>{
    dispatch({
        type: 'REORDER_CATEGORIES',
        payload: value
    });
};

