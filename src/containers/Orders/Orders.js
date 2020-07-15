import React, { Component } from 'react'
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
class Orders extends Component{

    componentDidMount(){
            // axios.get('/orders.json')
            //     .then(res=>{
            //         const fetchedOrders = [];
            //         for(let key in res.data){
            //             fetchedOrders.push({
            //                 ...res.data[key],
            //                 id:key,
            //             })
            //         }
            //         console.log(fetchedOrders);
            //         this.setState({loading:false,orders:fetchedOrders})
            //     }).catch(err=>{
            //         this.setState({loading:false})
            //     })
            this.props.onFetchOrders();

    }
    
    render(){
        let orders = <Spinner /> 
        if(!this.props.loading){
            orders = (
                 <div>
                {this.props.orders.map(order=>{
                   return  <Order
                    key = {order.id}
                    ingredients ={order.ingredients}
                    price ={+order.price} />
                })}
            </div>
            );
        }
        return orders;
    }
}

const mapStateToProps = state =>{
    return {
        orders: state.order.orders,
        loading:state.order.loading,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders: () => dispatch(actions.fetchOrders()),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));