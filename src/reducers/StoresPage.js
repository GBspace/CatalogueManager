import R from 'ramda';


const initialState = {
    ids: [],
    search: ''
    
};

const fetchIndexFromId = (state,id)=>{
    const idx = state.ids.indexOf(String(id))
    return idx;
};

export default (state = initialState,action)=>{
    switch(action.type){
        case 'FETCH_STORE_SUCCESS':
        {   return(
                R.merge(state,{
                    ids: R.pluck('id',action.payload)
                })
            );
        }
        case 'SEARCH_STORE' :
            {   return R.merge(state, {
                    search: action.payload
                });
            }
        case 'REORDER_STORES':
        {   
            const {  start: currPosId,end: nextPosId } = action.payload;
            let currPosIndex = fetchIndexFromId(state,currPosId);
            let nextPosIndex = fetchIndexFromId(state,nextPosId);
            const element = state.ids[currPosIndex];
            let ids = [
            ...state.ids.slice(0, currPosIndex),
            ...state.ids.slice(currPosIndex + 1)
            ]

            ids.splice(nextPosIndex, 0, element)
            return {
            ...state,
            ids
            }
        
        }
        
       
        default:
            return state;
    }
};