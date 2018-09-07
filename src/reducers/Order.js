const initialState = {
    orderedState : [],
    selectedStores: []
};

export default (state=initialState,action)=>{
    switch(action.type){
        case 'ADD_SELECTED':
            {
                state.orderedState = [...action.payload];
                console.log("Final ordered and selected items are ", state.orderedState);
                return state;
            }
              
        case 'UPDATE_SELECTED_STORE_TO_STORE':
            {   
                if(!state.selectedStores.includes(action.payload)){
                    return {selectedStores : [...state.selectedStores,action.payload]}
                }else{
                    const index = state.selectedStores.indexOf(action.payload);
                    state.selectedStores.splice(index,1);
                    return {selectedStores : [...state.selectedStores]};
                }

            }
       
        default:
            return state;
    }
};