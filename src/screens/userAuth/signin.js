import React, { Component } from 'react'

export default class Login extends Component{
    constructor(){
        super();
        this.state = {}
    }
    
    render(){
        return(
            <div style={{display:'flex',color:'black',flexDirection:'column',width:'40%',backgroundColor:'white',justifyContent:'center',alignItems:'center',margin:'2%'}}>
                Login
                <input style={{width:'80%'}} type='text' placeholder='Email'/>
                <input style={{width:'80%'}} type='password' placeholder='password'/>
                <button>Login</button>
            </div>
        )
    }
}