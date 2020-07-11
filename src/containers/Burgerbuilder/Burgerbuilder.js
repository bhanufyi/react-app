import React, { Component} from 'react'
import Aux from '../../hoc/Auxilary/Auxilary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat:1.3,
    bacon:0.7,
}

class Burgerbuilder extends Component{


    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0,
        },
        totalPrice:4,
        purchasable:false,
        purchasing:false,
    }

    purchaseHandler =() =>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = ()=>{
        alert("You can continue");
    }
    updatePurchaseState(ingredients){
        // const ingredients ={
        //     ...this.state.ingredients
        // }

        const sum = Object.keys(ingredients).map((key)=>{
            return ingredients[key];
        }).reduce((sum,el)=> sum += el,0);

        this.setState({purchasable:sum > 0 ? true:false})
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);




    }

    removeIngredientHandler = (type) =>{

        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceDeduction;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for( let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }

        return(
            <Aux>
                <Modal show = {this.state.purchasing}
                modalClosed ={this.purchaseCancelHandler}
                >
                    <OrderSummary 
                    purchaseCancelled= {this.purchaseCancelHandler}
                    purchaseContinued = {this.purchaseContinueHandler}
                    ingredients={this.state.ingredients}
                    price ={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                ingredientAdded ={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled ={disabledInfo} 
                price= {this.state.totalPrice}
                purchasable={this.state.purchasable} 
                ordered ={this.purchaseHandler}
                 />
                
            </Aux>
        );
    }

}

export default Burgerbuilder;