import React from 'react';
import {connect} from 'react-redux';
import {searchStore} from '../actions/Stores';

class Search extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            searchValue:''
        };

        this.handleSubmit=this.handleSubmit.bind(this);
        this.onSearchInputChange=this.onSearchInputChange.bind(this);
        this.clearInput=this.clearInput.bind(this);
    };


    handleSubmit = (e)=>{
        
        e.preventDefault();
        this.props.searchStore(this.state.searchValue);
    };

    onSearchInputChange = (e)=>{
        const searchValue = e.target.value;
        this.setState({
            searchValue
        });

    };

    clearInput=(e)=>{
        this.setState({
            searchValue:''
        });
        this.props.searchStore('');
        
    };  

    render(){
        return(
            <div className="well blosd">
                <h3 className="lead"> 
                    Find Your Deal 
                </h3>
                <div className="input-group">
                    <form>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.searchValue}    
                            onChange={this.onSearchInputChange}
                        />
                    </form>
                    <span className="input-group-btn">
                        <button className="btn btn-default" onClick={this.handleSubmit}>
                            <span className="glyphicon glyphicon-search" />
                        </button>
                    </span>
                </div>
                <div className="btn-clear">
                    <span className="input-group-btn">
                        <button className="btn btn-default" onClick={this.clearInput}>
                            Clear
                        </button>
                    </span>
                </div>
            </div>
        );
    };
};


const mapDispatchToProps = (dispatch)=>({
    searchStore: (text)=>dispatch(searchStore(text))
});

export default connect(undefined, mapDispatchToProps)(Search);