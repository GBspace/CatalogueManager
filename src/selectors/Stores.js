import R from 'ramda';


export const getStoresById = (state,id)=>R.prop(id,state.store);



export const getStoresByCategory = (state,category = null)=>{
    const activeCategoryId = category;
    
    console.log("activeCategoryId " , activeCategoryId);
    const applyCategory = (item)=>{
        // console.log("Item ", item);
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
    // console.log("stores for category " , activeCategoryId, " are : " , stores );
    return stores;
};


export const getStores = (state,ownProps)=>{
    // const stores = R.map(id=>getStoresById(state,id),state.StoresPage.ids);
    // return stores;

    const activeCategoryId = getActiveCategoryId(ownProps);
    // console.log("activeCategoryId " , activeCategoryId);
    const applyCategory = (item)=>{
        console.log("Item ", item);
        return R.equals(
            activeCategoryId,
            R.prop('categoryId',item)
        );
    };
    // console.log("state.StoresPage.search ", state.StoresPage.search);
    
    const applySearch = (item)=>{
        // console.log("R.prop('name',item) ", R.prop('name',item));
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
    console.log("Store for this category are ", stores);
    return stores;
};

export const getRenderedStoresLength = state => R.length(state.StoresPage.ids);

export const getTotalBasketPrice = state=>{
    
    const stores = R.map(id=>getStoresById(state,id),state.Basket);
    // console.log("Stores are " , stores);
    let total = 0;
    return stores.reduce((total,store)=>{
        return total + store.price;
    }, total);
    // console.log("Phone total is ", phnTotal);
};

export const getTotalBasketCount = state=>{
    return state.Basket.length;
};

export const getCategories = (state)=>{
    // console.log(" fething categories from state " ,R.values(state.Categories));
    return R.values(state.Categories);
};

export const getActiveCategoryId = ownProps=>{
    // console.log("ownProps " , ownProps);
    return R.path(['params','id'],ownProps);
};

export const getBasketStoresWithCount = (state)=>{
    const uniqueIds = R.uniq(state.Basket);

    const storeCount = (id)=>{
        return(
            R.compose(
                R.length,
                R.filter(basketId => R.equals(id,basketId))
            )(state.Basket)
        );
    };
    const storeWithCount = (store)=>{
        return R.assoc('count',storeCount(store.id),store);
    };
    const stores = R.compose(
        R.map(storeWithCount),
        R.map(id => getStoresById(state,id))
    )(uniqueIds);
    // console.log("Stores in basket are ", stores);
    return stores;
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
    // console.log("Selected Options in ordered format is ", selectedOptions);
    return(selectedOptions);
};

const sequencingCategories = (catStoresObj,state)=>{
    // console.log(catStoresObj);
    // console.log(state);
    // const id_array = Object.keys(state.Categories);
    // console.log("id_array ", state.Categories);
    const reorderedArr = [];
    Object.values(state.Categories).forEach(category=>{
        const id = category.id; 
        const obj = {};
        if(Object.keys(catStoresObj).includes(id)){
            obj[id]=catStoresObj[id];
            reorderedArr.push(obj);
        }
    });
    // console.log("sequencingCategories ", reorderedArr);
    return reorderedArr;
};

export const orderedSelectedStoresPerCategory = (state)=>{
    // console.log("state ", state);
    const catStoresObj = sequencingItems(state);
    const finalSequence = sequencingCategories(catStoresObj,state);
    return finalSequence;
    
    
};

export const getSelectedItemsCountPerCategory = (state)=>{
    const selectedItems = sequencingItems(state);
    // console.log("Keys ", Object.keys(selectedItems));
    // console.log("Keys ", Object.values(selectedItems));    
    const categoriesCount = Object.keys(selectedItems).reduce((acc,item)=>{
        acc[item] = selectedItems[item].length;
        return acc;
    },{});
    return categoriesCount;
};

export const getSelectedItemsList = (state)=>{
    return state.Order.selectedStores;
};