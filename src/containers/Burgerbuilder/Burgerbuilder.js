import React, { Component} from 'react'
import Aux from '../../hoc/Auxilary/Auxilary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from '../../axios-orders'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import Spinner from '../../components/UI/Spinner/Spinner'
import  * as actionTypes from '../../store/actions'
import {connect} from 'react-redux';

class Burgerbuilder extends Component{


    state = {
        
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false,
    }

    componentDidMount(){
        // axios.get('/ingredients.json')
        //     .then(res=>{
        //         this.setState({ingredients:res.data});
        //     })
        //     .catch(err=>{
        //         this.setState({error:true})
        //     })
    }

    purchaseHandler =() =>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = ()=>{
        //alert("You can continue");
        // console.log(this.props);


        //this.props.history.push('/checkout');
        // const queryParams = [];
        // for(let i in this.props.ings){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push(encodeURIComponent('price')+'='+encodeURIComponent(this.state.totalPrice));
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search:'?'+ queryString,
        this.props.history.push('/checkout');
    }
    updatePurchaseState(ingredients){
        // const ingredients ={
        //     ...this.state.ingredients
        // }

        const sum = Object.keys(ingredients).map((key)=>{
            return ingredients[key];
        }).reduce((sum,el)=> sum += el,0);

        //this.setState({purchasable:sum > 0 ? true:false})
        return sum > 0;
    }

    // addIngredientHandler = (type) =>{
    //     const oldCount = this.props.ings[type];
    //     const updatedCount = oldCount +1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     }

    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENTS_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) =>{

    //     const oldCount = this.props.ings[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount -1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }

    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENTS_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceDeduction;
    //     this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);

    // }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };

        for( let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>ingredients cant be loaded</p> : <Spinner/>
        if(this.props.ings){
            burger = (

                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                    ingredientAdded ={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled ={disabledInfo} 
                    price= {this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ings)} 
                    ordered ={this.purchaseHandler}
                     />
                </Aux>
            );

            orderSummary = <OrderSummary 
            purchaseCancelled= {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}
            ingredients={this.props.ings}
            price ={this.props.price} />

            if(this.state.loading){
                orderSummary = <Spinner />;
            }

        }
         

        return(
            <Aux>
                <Modal show = {this.state.purchasing}
                modalClosed ={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal> 
                {burger}
            </Aux>
        );
    }

}

const mapStateToProps = state =>{
    return{
        ings: state.ingredients,
        price :state.totalPrice,
    }
}

const mapDispatchToProps = dispatch =>{

        return{
            onIngredientAdded:(ingName) => dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
            onIngredientRemoved:(ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})

        }
}


export default connect( mapStateToProps,mapDispatchToProps)(withErrorHandler(Burgerbuilder,axios));