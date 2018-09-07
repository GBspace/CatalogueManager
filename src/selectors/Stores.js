import R from 'ramda';

export const getStoresById = (state,id)=>R.prop(id,state.store);

export const getActiveCategoryId = ownProps=>{
    return R.path(['params','id'],ownProps);
};

export const getStores = (state,ownProps)=>{
    const activeCategoryId = getActiveCategoryId(ownProps);
    const applyCategory = (item)=>{
        return R.equals(
            activeCategoryId,
            R.prop('categoryId',item)
        );
    };
    const applySearch = (item)=>{
        return R.contains(
            state.StoresPage.search,
            (R.prop('name',item)).toLowerCase()
        )
    };
    
    const stores = R.compose(
        R.filter(applySearch),
        R.when(R.always(activeCategoryId), R.filter(applyCategory)),
        R.map(id=>getStoresById(state,id))
    )(state.StoresPage.ids);
    return stores;
};

export const getCategories = (state)=>{
    return R.values(state.Categories);
};



const sequencingItems = (state)=>{
    const selectedOptions = {};
    state.StoresPage.ids.forEach(phnId => {
        if(state.Order.selectedStores.includes(phnId)){
            const storeObj = getStoresById(state,phnId);
            const categoryObj = storeObj["categoryId"];
            
            if(selectedOptions.hasOwnProperty(categoryObj)){
                selectedOptions[categoryObj].push(phnId);
            }else{
                selectedOptions[categoryObj] = [phnId]
            }
        }
    });
    return(selectedOptions);
};

const sequencingCategories = (catStoresObj,state)=>{
    const reorderedArr = [];
    Object.values(state.Categories).forEach(category=>{
        const id = category.id; 
        const obj = {};
        if(Object.keys(catStoresObj).includes(id)){
            obj[id]=catStoresObj[id];
            reorderedArr.push(obj);
        }
    });
    return reorderedArr;
};

export const orderedSelectedStoresPerCategory = (state)=>{
    const catStoresObj = sequencingItems(state);
    const finalSequence = sequencingCategories(catStoresObj,state);
    return finalSequence;
};

export const getSelectedItemsCountPerCategory = (state)=>{
    const selectedItems = sequencingItems(state);
    const categoriesCount = Object.keys(selectedItems).reduce((acc,item)=>{
        acc[item] = selectedItems[item].length;
        return acc;
    },{});
    return categoriesCount;
};

export const getSelectedItemsList = (state)=>{
    return state.Order.selectedStores;
};