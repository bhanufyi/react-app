import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route , Switch ,withRouter, Redirect } from 'react-router-dom'
import './App.css';
import { connect } from 'react-redux';
import BurgerBuilder from './containers/Burgerbuilder/Burgerbuilder'
//import './containers/Checkout/Checkout'
//import  './containers/Orders/Orders';
//import './containers/Auth/Auth';
import * as actions from './store/actions/index';
//import  './containers/Auth/Logout/Logout';
import asyncComponent  from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(()=>{
  return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

const asyncLogout = asyncComponent(() => {
  return import("./containers/Auth/Logout/Logout");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = (
    <Switch>
       <Route path="/auth" component={asyncAuth} />
       <Route path="/" exact component={BurgerBuilder} />
       <Redirect to='/'/>
    </Switch>
    );
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={asyncLogout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuthenticated :state.auth.token !== null
  }
}

const mapDispatchToProps  = dispatch =>{
  return {
    onTryAutoSignup : () => dispatch(actions.authCheckState())
  };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
