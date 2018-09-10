import React from 'react';

import Search from './Search';
import Categories from './Categories';
import GotoCustomer from './GotoCustomer';

export const SideBar = ()=>{
    return(
        <div>
            <Search/>
            <Categories/>
            <GotoCustomer/>
        </div>
    );
};