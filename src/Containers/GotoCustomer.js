import React from 'react';
import {Link} from 'react-router';

export default ()=>{
    return(
        <div className="well blosd">
            <Link type="button" className="btn btn-default" 
                to={`/Result`}
                // className={linkClass}
                key="result"
            >
                <span className="glyphicon glyphicon-arrow-right"> Customer View </span>
            </Link>
        </div>
    );
};