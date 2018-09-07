import React from 'react';
import {connect} from 'react-redux';
import {getCategories,getActiveCategoryId,
        getSelectedItemsCountPerCategory} from '../selectors/Stores';
import {Link,withRouter} from 'react-router';
import {compose} from 'redux';
import classNames from 'classnames';
import R from 'ramda';
import {reorderCategories} from '../actions/Categories';


 class Categories extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            draggedItemIndex: null,
            editedItemIndex: null
        };

        // this.handleDragOver = this.handleDragOver.bind(this);
        // this.handleDragStart = this.handleDragStart.bind(this);
        // this.handleDrop = this.handleDrop.bind(this);


    }
    
    reorderItem = ({start,end})=>{
        // console.log("Reordering");
        end = parseInt(end,10);
        start = parseInt(start,10);
        // console.log("end and start are ", end , start);
        const reorderIsCorrect = !isNaN(start) && !isNaN(end) && start !== end;
        if (reorderIsCorrect) {
            this.props.reorderCategories({start,end});
        }
    };
    
    handleDragOver = (e)=>{
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    handleDragStart = (e)=>{
        this.setState({
            draggedItemIndex: e.currentTarget.id
        });
    };

    handleDrop = (e)=>{
        const droppedItemId = e.currentTarget.id;
        // console.log("Handling drop at" , droppedItemId);
        // console.log("element " , this.state.draggedItemIndex , " to be dropped");
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
    // console.log(" activeCategoryId " , activeCategoryId);
    renderCategory = (category,index)=>{
        const getActiveState = R.propEq('id',this.props.activeCategoryId);
        const linkClass = classNames({
            "list-group-item" : true,
            'active': getActiveState(category)
        });
        const itemCountPerCat = this.props.getSelectedItemsCountPerCategory
        return(
            <div key={category.id}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
                draggable='true'
                // id={category.id}
                id={index}
                >
                <Link 
                    to={`/categories/${category.id}`}
                    className={linkClass}
                    key={index}
                >
                    {category.name}
                    <div className="pull-right">{itemCountPerCat[category.id]}</div>
                </Link>
            </div>
        );
    };

    renderAllCategory = ()=>{
        const linkClass = classNames({
            "list-group-item" : true,
            active: R.isNil(this.props.activeCategoryId)
        });

        return (
            <Link
                to="/"
                className={linkClass}
            >
            All
            </Link>
        );
    };
    render(){
        const {categories} = this.props;
        return(
            <div className="well">
                <h4>Brand</h4>
                <div className="list-group">
                    {
                        this.renderAllCategory()
                    }
                   
                    {
                        categories.map((category,index)=>{
                        // console.log(category);
                        return this.renderCategory(category,index);
                    })
                }
                </div>
            </div>
        );
    }; 
};

const mapStateToProps = (state,ownProps)=>({
    categories: getCategories(state),
    activeCategoryId: getActiveCategoryId(ownProps),
    // orderedSelectedStoresPerCategory: orderedSelectedStoresPerCategory(state),
    getSelectedItemsCountPerCategory:getSelectedItemsCountPerCategory(state)
});

const mapDispatchToProps = (dispatch)=>({
    reorderCategories: (value)=>dispatch(reorderCategories(value))
});

export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(Categories);
// export default connect(mapStateToProps)(Categories);