import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () =>{
    return {
        type:actionTypes.PURSCHASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
      dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then((res) => {
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};


export const purchaseInit = ()=>{
    return {
        type: actionTypes.PURCHASE_INIT,
    };

}


export const fetchOrdersSuccess = (orders)=>{
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders,
    }
}


export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
    
  };
};


export const fetchOrderStart = ()=>{
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () =>{

    return dispatch =>{
        dispatch(fetchOrderStart());
        axios
          .get("/orders.json")
          .then((res) => {
            const fetchedOrders = [];
            for (let key in res.data) {
              fetchedOrders.push({
                ...res.data[key],
                id: key,
              });
            }
            console.log(fetchedOrders);
            dispatch(fetchOrdersSuccess(fetchedOrders));
            //this.setState({ loading: false, orders: fetchedOrders });
          })
          .catch((err) => {
           // this.setState({ loading: false });
           dispatch(fetchOrdersFail(err));
          });

    }
}


