import React from 'react';
import {SideBar} from './SideBar';


const Layout = ({children})=>{
    return (
        <div className="view-container">
           
            <div className="container"> 
                <div className="header-footer">
                    <div className="page-header">
                        <h1>Catalogue Manager</h1>      
                    </div> 
                </div>
               
                <div className="row">
                    <div className="col-md-3">
                        <SideBar/>
                    </div>
                    <div className="col-md-9">
                        {children}
                    </div>
                </div>
                <div className="header-footer">
                    <footer className="footer">
                        <div className="container">
                            <span className="text-muted">Contact Us: ######</span>
                        </div>
                    </footer>
                </div>
                
            </div>
           
            
        </div>
    )
};

export default Layout;