import React from 'react';
import {connect} from 'react-redux';
import { getTotalBasketPrice,getBasketStoresWithCount } from '../selectors/Stores';
import R from 'ramda';
import {removePhoneFromBasket,cleanBasket,basketCheckout} from '../actions/Stores';
import {Link} from 'react-router';

const Basket = ({stores,totalPrice,
                removePhoneFromBasket,cleanBasket,
                basketCheckout})=>{
    // console.log(stores);
    // console.log(totalPrice);
    const isBasketEmpty = R.isEmpty(stores);
    const renderContent = () => {
        return (
            <div>
                {isBasketEmpty && <div> Your shopping cart is empty </div>}
                <div className="table-responsive">
                    <table className="table-bordered table-striped table-condensed cf">
                        <tbody>
                            {stores.map((store,index)=>(
                                <tr key={index}
                                    className="item-checout">
                                    <td className="first-column-checkout">
                                        <img className="img-thumbnail"
                                            src={store.image}
                                            alt={store.name}  
                                        />
                                    </td>
                                    <td>{store.name}</td>
                                    <td>${store.price}</td>
                                    <td>{store.count}</td>
                                    <td>
                                        <span className="delete-cart"
                                        onClick={()=>removePhoneFromBasket(store.id)}></span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {
                    R.not(isBasketEmpty) &&
                    <div className="row">
                        <div className="pull-right total-user-checkout">
                            <b>Total:</b>
                            ${totalPrice}
                        </div>
                    </div>
                }
            </div>
            )
        };

        const renderSidebar = ()=>{
            return(
                <div>   
                    <Link
                        className="btn btn-info"
                        to="/"
                    >
                    <span className="glyphicon glyphicon-info-sign"/>
                    <span> Continue Shopping</span>
                    </Link>
                    {
                        R.not(isBasketEmpty) &&
                        <div>
                            <button className="btn btn-danger"
                                    onClick={()=>cleanBasket()}        
                            >
                            <span className="glyphicon glyphicon-trash"/>
                            Clean Cart
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={()=>basketCheckout(stores)}
                            >
                            <span className="glyphicon glyphicon-envelope"/>
                            Checkout
                            </button>
                        </div>
                    }
                </div>
            );
        };

    return(
        <div className="view-container">
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        {renderContent()}
                    </div>
                    <div className="col-md-3 btn-user-checkout">
                        {renderSidebar()}
                    </div>
                </div>
            </div>
        </div>
    );
    };


const mapStateToProps = (state)=>({
    stores: getBasketStoresWithCount(state),
    totalPrice: getTotalBasketPrice(state)
});

const mapDispatchToProps = (dispatch)=>({
    removePhoneFromBasket: (id)=>dispatch(removePhoneFromBasket(id)),
    cleanBasket: ()=>dispatch(cleanBasket()),
    basketCheckout: (stores)=>dispatch(basketCheckout(stores))
});

export default connect(mapStateToProps,mapDispatchToProps)(Basket);