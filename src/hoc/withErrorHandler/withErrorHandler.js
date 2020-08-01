import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary/Auxilary'
const withErrorHandler = (WrapperComponent,axios)=>{
    return class extends Component{
        
        state = {
            error:null
        }

        componentWillMount(){
            //console.log("component will unmount",this.reqInterceptor,this.resInterceptor);
            this.reqInterceptor = axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            })
           // console.log(this.reqInterceptor);
            this.resInterceptor = axios.interceptors.response.use(res=>res,err=>{
                    this.setState({error:err})
            })
           // console.log(this.resInterceptor);
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler =()=>{
            this.setState({error:null});
        }

        render(){
                return (
                    <Aux>
                        <Modal 
                        modalClosed={this.errorConfirmedHandler}
                        show={this.state.error}>
                           {this.state.error ?this.state.error.message :null}
                        </Modal>
                        <WrapperComponent { ...this.props} /> 
                    </Aux>
                    
                )
    
        }
    }
}

export default withErrorHandler;