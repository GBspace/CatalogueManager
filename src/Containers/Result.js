import React from 'react';
import {connect} from 'react-redux';
import {orderedSelectedStoresPerCategory,getCategories} from '../selectors/Stores';
import R from 'ramda';
import {Link} from 'react-router';
 
class Result extends React.Component{


    renderStore = (storeId,index)=>{
        const {stores} = this.props;
        const storeObj = stores[storeId];
        return(
            <div className="panel-body" key={index}> {storeObj.name}</div>
        );

    }

    renderCategory = (cat,index)=>{
        const {category} = this.props
        const categoryId = Object.keys(cat)[0];
        const newCat = R.find(R.propEq('id', categoryId), category);
        return(
            
            <div key={index} className='panel panel-primary'>
                <div className="panel-heading">  {newCat['name']} </div>
                {
                    Object.values(cat).map((storeIds,index)=>
                        storeIds.map((storeId,index)=>
                            this.renderStore(storeId,index))
                    
                )}
            </div>
        );
    };

    render(){
        const {result}=this.props;
        return(
                <div className="view-container">
                    <div className="header-footer">
                        <div className="page-header">
                            <h1>Catalogue Manager</h1>      
                        </div> 
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="well blosd">
                                    <Link type="button" className="btn btn-default" 
                                        to={`/`}
                                        key="backbutton">
                                        <span className="glyphicon glyphicon-arrow-left"> Back To Catalogue</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-9">
                                {
                                    result.map((category,index)=>this.renderCategory(category,index))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
    };


const mapStateToProps = (state)=>({
    result:orderedSelectedStoresPerCategory(state),
    category: getCategories(state),
    stores:state.store
});

export default connect(mapStateToProps)(Result);