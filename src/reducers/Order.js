const initialState = {

        //categoryID: [itemId1,ItemId2...] --> ordered
        orderedState : [],
        selectedStores: []
    
};

export default (state=initialState,action)=>{
    switch(action.type){

        case 'ADD_SELECTED':
            {
                // console.log("Adding selected items to customer console." , action.payload);
                state.orderedState = [...action.payload];
                console.log("Final ordered and selected items are ", state.orderedState);
                // console.log(state);
                return state;
            }
              
        case 'UPDATE_SELECTED_STORE_TO_STORE':
            {   
                // console.log("Got phnId ", action.payload);
                if(!state.selectedStores.includes(action.payload)){
                    // console.log("Updating phn where state does not include ", action.payload);
                    return {selectedStores : [...state.selectedStores,action.payload]}
                }else{
                    // console.log("phn present, removing");
                    const index = state.selectedStores.indexOf(action.payload);
                    state.selectedStores.splice(index,1);
                    // console.log("Array after removal ", state.selectedStores);
                    return {selectedStores : [...state.selectedStores]};
                }

            }
       
        case 'GET_SELECTED_STORES_FROM_STORE':
            {   
                // console.log("State is ", state);
                return state;
            }

        default:
            return state;
    };
};