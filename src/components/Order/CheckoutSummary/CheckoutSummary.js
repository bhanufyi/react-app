import React from 'react'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

const checkoutSummary = (props)=>{  
    return (
        <div className={classes.CheckoutSummary}>
            <h1>we hope it tastes well</h1>
            <div style={{width:'100%',margin:'auto'}}></div>
            {console.log(props.ingredients)}
            <Burger ingredients={props.ingredients}/>
            <Button btnType= "Danger"
            clicked={props.checkoutCancelled}>Cancel</Button>
             <Button btnType= "Success"
             clicked={props.checkoutContinued}>Continue</Button>
        </div>
        
    )

}

export default checkoutSummary;