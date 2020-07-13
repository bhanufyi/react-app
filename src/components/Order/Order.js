import React from 'react'
import classes from './Order.css'
const order = (props)=>{

    const  Ingredients = [];

    for(let ing in props.ingredients){
        Ingredients.push(
            {
                name:ing,
                amount:props.ingredients[ing],
            }
        )
    }

    const IngredientOutput = Ingredients.map(ing=>{
        return <span 
        style ={{textTransform:'capitalize',
        display:'inline-block',
        margin:'0 8px',
        border:'1px solid #ccc',
        padding:'5px',
        
    }}
        key = {ing.name}> {ing.name} ({ing.amount}) </span> ;
    })

   return ( <div className={classes.Order}>
        <p>Ingredients : {IngredientOutput}</p>
        <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>)
}

export default order;
