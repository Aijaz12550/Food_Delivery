import React, { Component } from 'react'
import { fire } from '../../config/firebase'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';


export default class Login extends Component{
    constructor(){
        super();
        this.state = {
            email:null, password:null,error:null
        }
    }
    login(){
        let { email, password } = this.state;
fire.auth().signInWithEmailAndPassword(email, password).then((user)=>{
    console.log('user',user)
    this.props.history.push('/dashboard')
}).catch(err=>this.setState({error:err.message}))

    }
    
    render(){
        return(
            

            //  <div style={{display:'flex',color:'black',flexDirection:'column',boxShadow: '3px 3px 4px 4px rgb(240, 237, 237)',justifyContent:'center',alignItems:'center',margin:'2%'}}>
            <MDBContainer style={{ width:'80%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center',  marginTop: '4%', padding: '1%', color: 'black',  boxShadow: '3px 3px 4px 4px rgb(240, 237, 237)',alignContent:'center',paddingLeft:"6%" }}>
            {/* //     Login
            //     <input onChange={(e)=>{this.setState({email:e.target.value})}} style={{width:'100%'}} type='text' placeholder='Email'/>
            //     <input onChange={(e)=>{this.setState({password:e.target.value})}} style={{width:'100%'}} type='password' placeholder='password'/>
            //     <p>{this.state.error && this.state.error }</p>
            //     <button onClick={()=>{this.login()}} >Login</button> */} 


                {/* ================== */}
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput
              onChange={(e)=>{this.setState({email:e.target.value})}}
                label="Type your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                />
              <MDBInput
              onChange={(e)=>{this.setState({password:e.target.value})}}
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
              />
            </div>
            <div className="text-center">
            <p style={{color:'red'}}>{this.state.error && this.state.error }</p>
              <MDBBtn onClick={()=>{this.login()}} style={{padding:'0'}}>Login</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
            // </div> 
                
        )
    }
}