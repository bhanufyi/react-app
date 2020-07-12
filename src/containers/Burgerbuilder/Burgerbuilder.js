import React, { Component} from 'react'
import Aux from '../../hoc/Auxilary/Auxilary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from '../../axios-orders'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import Spinner from '../../components/UI/Spinner/Spinner'
const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat:1.3,
    bacon:0.7,
}

class Burgerbuilder extends Component{


    state = {
        ingredients:null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false,
    }

    componentDidMount(){
        axios.get('/ingredients.json')
            .then(res=>{
                this.setState({ingredients:res.data});
            })
            .catch(err=>{
                this.setState({error:true})
            })
    }

    purchaseHandler =() =>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = ()=>{
        //alert("You can continue");
        this.setState({loading:true})
        const order = {
            ingredients: this.state.ingredients,
            price :this.state.totalPrice,
            customer :{
                name :"bhanu",
                address:{
                    street:"bhanustreet",
                    zipcode:'41351',
                    country:'india'
                },
                email:'ammababoi@gmail.com'
            },
            deliveryMethod:'fastest'
        }
        axios.post("/orders.json",order)
            .then(res=>{
                this.setState({loading:false, purchasing:false});
            }).catch(err=>{
                this.setState({loading:false, purchasing:false});
            })

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
        let orderSummary = null;

        let burger = this.state.error ? <p>ingredients cant be loaded</p> : <Spinner/>
        if(this.state.ingredients){
            burger = (

                <Aux>
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

            orderSummary = <OrderSummary 
            purchaseCancelled= {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}
            ingredients={this.state.ingredients}
            price ={this.state.totalPrice} />

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

export default withErrorHandler(Burgerbuilder,axios);