import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject,checkValidity } from '../../../shared/utility';
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched:false,
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched:false,
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength:5,
        },
        valid: false,
        touched:false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched:false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched:false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation:{},
        valid:true,
      },
    },
    formIsValid:false,
    
  };

  

  orderHandler = (event) => {
    event.preventDefault();
    // this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId:this.props.userId,
    };

    this.props.onOrderBurger(order,this.props.token);

    // axios
    //   .post("/orders.json", order)
    //   .then((res) => {
    //     console.log(res);
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //   })
    //   .catch((err) => {
    //     this.setState({ loading: false });
    //   });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    //console.log(event.target.value);
    
    const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
      value:event.target.value,
      valid: checkValidity(
      event.target.value,
      this.state.orderForm[inputIdentifier].validation
    ),
      touched: true,
    });

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm){
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm ,formIsValid:formIsValid});
    
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form action="" onSubmit={this.orderHandler}>
        {formElementArray.map((formElement) => {
          return (
            <Input
              changed={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              touched = {formElement.config.touched}
            />
          );
        })}

        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}


const mapStateToProps = state =>{
  return {
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    loading:state.order.loading,
    token :state.auth.token,
    userId : state.auth.userId,

    }
}


const mapDispatchToProps = dispatch =>{
  return {
    onOrderBurger: (orderData,token) =>
      dispatch(actions.purchaseBurger(orderData,token)),
  };
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
