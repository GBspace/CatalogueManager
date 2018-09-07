import R from 'ramda';


const initialState = {
    ids: [],
    search: ''
    
};

const fetchIndexFromId = (state,id)=>{
    const idx = state.ids.indexOf(String(id))
    console.log("idx ", idx);
    return idx;
};

export default (state = initialState,action)=>{
    switch(action.type){
        case 'FETCH_STORE_SUCCESS':
            return(
                R.merge(state,{
                    ids: R.pluck('id',action.payload)
                })
            );
      
        case 'SEARCH_STORE' :
            {   console.log("text to be searched is " , action.payload);
                return R.merge(state, {
                    search: action.payload
                });
            }
        case 'REORDER_STORES':
        {   
            console.log("INSIDE REORDERING STORE -- STATE.ids IS  " , state.ids);
            
            const {  start: currPosId,end: nextPosId } = action.payload;
            let currPosIndex = fetchIndexFromId(state,currPosId);
            let nextPosIndex = fetchIndexFromId(state,nextPosId);

            console.log("start at ", currPosIndex , "End at " , nextPosIndex);
            const element = state.ids[currPosIndex];
            console.log(" id of the item moved is ", element)
            let ids = [
            ...state.ids.slice(0, currPosIndex),
            ...state.ids.slice(currPosIndex + 1)
            ]

            ids.splice(nextPosIndex, 0, element)
            console.log("IDS after reordering are ", ids);
            return {
            ...state,
            ids
            }
        
        };
        
       
        default:
            return state;
    }
};