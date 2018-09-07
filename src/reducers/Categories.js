import R from 'ramda';


const initialState = {
   
};

export default (state = initialState,action)=>{
    switch(action.type){
        case 'FETCH_CATEGORIES_SUCCESS':
            const newVal = R.indexBy(R.prop('id'), action.payload);
            // console.log("newwVal ", newVal);
            return(
                R.merge(state,newVal)
            );
        case 'REORDER_CATEGORIES': 
            {
            const {  start: currPosIndex,end: nextPosIndex } = action.payload;
            const categories = Object.values(state);
            categories.splice(nextPosIndex,0,categories.splice(currPosIndex,1)[0]);
            let count = 1;
            const catObj = categories.reduce((obj,item)=>{
                obj[count] = item;
                count++;
                return obj;
            },{});
            return catObj;
            }  ;
        default:
            return state;
    }
};