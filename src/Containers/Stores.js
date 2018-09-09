import React from 'react';
import {connect} from 'react-redux';
import {fetchStores,fetchCategories} from '../actions/Stores';
import {getStores,orderedSelectedStoresPerCategory,getSelectedItemsList} from '../selectors/Stores';
import {reOrderStores} from '../actions/Stores';
import {updateSelectedStoreToStore} from '../actions/Order';
import {Link} from 'react-router';

class Stores extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            draggedItemIndex: null
        };
    };

    componentDidMount(){
        this.props.fetchStores();
        this.props.fetchCategories();
    };

    handleDragStart = (e)=>{
        this.setState({
            draggedItemIndex: e.currentTarget.id
        });
    };

    handleDragOver = (e)=>{

        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    reorderItem = ({start,end})=>{
        end = parseInt(end,10);
        start = parseInt(start,10);
        const reorderIsCorrect = !isNaN(start) && !isNaN(end) && start !== end;
        if (reorderIsCorrect) {
           this.props.reOrderStores({start,end});
        }
    };

    handleDrop = (e)=>{
        const droppedItemId = e.currentTarget.id;
        this.reorderItem({
                start: this.state.draggedItemIndex,
                end: droppedItemId
            });
        
        this.setState({
            draggedItemIndex: null
        });
    };

    // updateState = (storeId)=>{
    //     const existingArray = this.state.selected;
    //         if( existingArray.includes(storeId)){
    //             for( var i = 0; i <= existingArray.length-1; i++){ 
    //                 if ( existingArray[i] === storeId) {
    //                     existingArray.splice(i, 1); 
    //                 }
    //             }
    //             this.setState({
    //                 selected: existingArray
    //             })
    //         }else{
    //             this.setState((prevState) => ({
    //                 selected: [...prevState.selected, storeId]
    //             }))
            
    //         };
    // };

    itemSelected = (storeId) => (e)=>{
        e.preventDefault();
        this.props.updateSelectedStoreToStore(storeId);
    };

    renderStore = (store,index)=>{
        return (
            <div className='col-sm-4 col-lg-4 col-md-4 book-list' key={index} id={store.id}
                onClick={this.itemSelected(store.id)}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
                draggable='true'
               >
                <div className="thumbnail">
                    <img className={
                            (this.props.getSelectedItemsList.includes(store.id)) ?
                                    'img-thumbnail-selected':
                                    'img-thumbnail'
                                }
                        src={store.image}
                        alt={store.name}
                    
                    />
                    
                    <div className="middle">
                        <div className="text">
                            <h5>5 left near you</h5>
                        </div>   
                    </div>
                </div>
            
                <div className="caption">
                    <h4 className="pull-right">
                        ${store.price}
                    </h4>
                    <h4>
                        <div>
                            {store.name}
                        </div>
                    </h4>
                    <p> {store.description}</p>
                </div>
            </div>
        );
    };

    render(){
        const {stores} = this.props;
        const linkClass = ({
            "list-group-item" : true
        });

        return(
        <div>
            <div className="books row">
                {stores.map((store,index)=>{
                    return this.renderStore(store,index);
                })}
            </div>
            
            <div className="row">
                <div className="col-md-12">
                    <Link type="button" className="btn btn-default" 
                        to={`/Result`}
                        // className={linkClass}
                        key="result"
                    >
                        <span className="glyphicon glyphicon-arrow-right"> Customer View </span>
                    </Link>
                </div>
            </div>
            

        </div>            
       
        )};
};

const mapDispatchToProps = (dispatch)=>({
    fetchStores: ()=>dispatch(fetchStores()),
    fetchCategories: ()=>dispatch(fetchCategories()),
    reOrderStores: (value)=>dispatch(reOrderStores(value)),
    updateSelectedStoreToStore:(storeID)=>dispatch(updateSelectedStoreToStore(storeID)),
});

const mapStateToProps = (state,ownProps)=>{
    return ({
        stores: getStores(state,ownProps),
        orderedSelectedStoresPerCategory: orderedSelectedStoresPerCategory(state),
        getSelectedItemsList:getSelectedItemsList(state)
    });
};

export default connect(mapStateToProps,mapDispatchToProps)(Stores);