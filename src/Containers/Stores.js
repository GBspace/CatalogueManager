import React from 'react';
import {connect} from 'react-redux';
import {fetchStores,fetchCategories} from '../actions/Stores';
import {getStores,orderedSelectedStoresPerCategory,getSelectedItemsList} from '../selectors/Stores';
import {Link} from 'react-router';
import R from 'ramda';
import {reOrderStores} from '../actions/Stores';
import {addSelectedToStore,updateSelectedPhoneToStore} from '../actions/Order';

class Stores extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            draggedItemIndex: null
            // ,
            // editedItemIndex: null
        };
    };

    componentDidMount(){
        this.props.fetchStores();
        this.props.fetchCategories();
    };

    handleDragStart = (e)=>{
        console.log("Handling drag start from" , e.currentTarget.id);
        this.setState({
            draggedItemIndex: e.currentTarget.id
        });
    };

    handleDragOver = (e)=>{

        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    reorderItem = ({start,end})=>{
        console.log("Reordering");
        end = parseInt(end,10);
        start = parseInt(start,10);
        console.log("end and start are ", end , start);
        const reorderIsCorrect = !isNaN(start) && !isNaN(end) && start !== end;
        if (reorderIsCorrect) {
           this.props.reOrderStores({start,end});
        }
    };

    handleDrop = (e)=>{
        const droppedItemId = e.currentTarget.id;
        console.log("Handling drop at" , droppedItemId);
        console.log("element " , this.state.draggedItemIndex , " to be dropped");
        // if(this.state.editedItemIndex === null){
            this.reorderItem({
                start: this.state.draggedItemIndex,
                end: droppedItemId
            });
        // }
        
        this.setState({
            draggedItemIndex: null
        });
        // console.log("dropped");
        
    };

    updatingSelectedArray = ()=>{

    };  

    updateState = (storeId)=>{
        const existingArray = this.state.selected;
        // console.log("Existing array ", existingArray);
        // console.log("storeID " , storeId);
        // console.log("State before updating ", existingArray);
        
            if( existingArray.includes(storeId)){
                for( var i = 0; i <= existingArray.length-1; i++){ 
                    if ( existingArray[i] === storeId) {
                        // console.log("splicing");
                        existingArray.splice(i, 1); 
                    }
                }
            
               
                this.setState({
                    selected: existingArray
                })
            }else{
                this.setState((prevState) => ({
                    selected: [...prevState.selected, storeId]
                }))
            
            };
            // console.log("State after updating ", this.state.selected);
    };

    itemSelected = (storeId) => (e)=>{
        // console.log(this.props)
        e.preventDefault();
        // const currId = e.currentTarget.id;
        // console.log("Updating array with phn id ", storeId);
        // this.updateState(storeId);
        // this.props.addSelectedToStore(this.state.selected);
        this.props.updateSelectedPhoneToStore(storeId);
        // this.props.getSelectedStoresFromStore();
        
       
        
        // this.props.addSelectedToStore(this.state.selected);

        
    };


 

 

    renderPhone = (store,index)=>{
        // console.log("RENDERING Store ", store);
        // console.log("Index ", index);
        let thumbnail = null;
        
        return (
            
            <div className='col-sm-4 col-lg-4 col-md-4 book-list' key={index} id={store.id}
            // id={index}
                onClick={this.itemSelected(store.id)}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
                draggable='true'
               >
                <div className="thumbnail">
                    <img className={
                            // thumbnail
                            (this.props.getSelectedItemsList.includes(store.id)) ?
                                    thumbnail = 'img-thumbnail-selected':
                                    thumbnail = 'img-thumbnail'
                                }
                        src={store.image}
                        alt={store.name}
                    
                    />
                    
                    <div className="middle">
                        <div className="text">
                            Offer till stock lasts!!!
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
        const {stores,
                
            addSelectedToStore,orderedSelectedStoresPerCategory,orderedState} = this.props;
      
        return(
        <div>
           
            <div className="books row">
                {stores.map((store,index)=>{
                    return this.renderPhone(store,index);
                })}
            </div>
            
            <div className="row">
                <div className="col-md-12">
                    
            
                    <button className="pull-right btn btn-primary"
                        onClick={()=>addSelectedToStore(orderedSelectedStoresPerCategory)}
                        >
                        Save
                    </button>
                    
                  
                </div>

            </div>
        </div>            
       
        )};
};

const mapDispatchToProps = (dispatch)=>({
    fetchStores: ()=>dispatch(fetchStores()),
    // addPhoneToBasket: (id)=>dispatch(addPhoneToBasket(id)),
    fetchCategories: ()=>dispatch(fetchCategories()),
    reOrderStores: (value)=>dispatch(reOrderStores(value)),
    updateSelectedPhoneToStore:(storeID)=>dispatch(updateSelectedPhoneToStore(storeID)),
    addSelectedToStore:(value)=>dispatch(addSelectedToStore(value))

    // ,
    // getSelectedStoresFromStore:()=>dispatch(getSelectedStoresFromStore())
    
    
});
//ownProps are available here because this component is defined directly on route.
//child componenets must include compose withRoutes
const mapStateToProps = (state,ownProps)=>{
    // console.log("state is " , state , "and  ownProps are ", ownProps);
    return ({
        stores: getStores(state,ownProps),
        orderedSelectedStoresPerCategory: orderedSelectedStoresPerCategory(state),
        getSelectedItemsList:getSelectedItemsList(state),
        orderedState: state.Order.orderedState
    });
};

export default connect(mapStateToProps,mapDispatchToProps)(Stores);