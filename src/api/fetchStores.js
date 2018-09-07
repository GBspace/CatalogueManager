import stores from './mockStores';
import R from 'ramda';
import mockCategories from './mockCategories';

export const fetchStores = async () =>{
    return new Promise(resolve =>{
        resolve(stores);
    });

   
};



export const fetchPhoneById = async id=>{
    return new Promise((resolve,reject)=>{
        console.log("Id in api fetchStores " , id);
        const store = R.find(R.propEq('id',id),stores);
        resolve(store);
    });
};

export const fetchCategories = async ()=>{
    return new Promise(resolve =>{
        resolve(mockCategories);
    });
}