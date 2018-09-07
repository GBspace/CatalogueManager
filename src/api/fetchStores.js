import stores from './mockStores';
import mockCategories from './mockCategories';

export const fetchStores = async () =>{
    return new Promise(resolve =>{
        resolve(stores);
    });

   
};

export const fetchCategories = async ()=>{
    return new Promise(resolve =>{
        resolve(mockCategories);
    });
}