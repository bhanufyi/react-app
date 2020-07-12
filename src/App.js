import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import './App.css';
import Burgerbuilder from './containers/Burgerbuilder/Burgerbuilder'
class App extends Component {
 

  render() {
    return (
      <div>
        <Layout>
          <Burgerbuilder/> 
        </Layout>
      </div>
    );
  }
}

export default App;
