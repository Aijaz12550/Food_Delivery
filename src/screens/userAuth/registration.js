import React, { Component } from 'react'
import { Label, Input } from 'reactstrap'
import { fire, db } from '../../config/firebase'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput,  } from 'mdbreact';

//redux
import { updateUser, removeUser } from '../../store/action'
import { connect } from 'react-redux'

import {
  CountryDropdown, RegionDropdown,
  CountryRegionData
} from 'react-country-region-selector';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import history from '../../config/history'
import { tsLiteralType } from '@babel/types';
require('firebase/auth')
require('firebase/database')


 class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      name: '', email: '', gender:'', dob:'', country:'', region:'', password: '', cpassword: '',error:'',ne:'', em:'',
      ge:'', pe:'', cpe:'',
    };

    this.handleChange = this.handleChange.bind(this);

  }

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ region: val });
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  //INPUT
  inputs(val, entry){
    let { name, email, gender, dob, country, region, password, cpassword } = this.state;
// NAME
if (val == 'fname') {
  this.setState({name:entry})
  if ( name.length < 2 ){
    this.setState({ ne : 'Name must be three characters long'})
  }else{this.setState({ne:''})} 
}

// EMAIL
if (val == 'email') {
  this.setState({email:entry})
  if (!(name.length)){
    this.setState({ ne : 'Please Enter your name here..'})
  }else{this.setState({ne:''})}
 
  function validateEmail(email){
    var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return emailReg.test(email);
}
     if (validateEmail(entry)){
       this.setState({em:''})
      }else{this.setState({em:'Email not valid'})}
}

// GENDER
if(val == 'gender'){
  if( entry == 'Male' || entry == 'Female' || entry == 'others'){
    this.setState({gender:entry,ge:''})
  }
}

  // DATE OF BIRTH
  if( val == 'dob'){
    if( !(gender.length) ){
      this.setState({ge:'Gender Not Selected..'})
    }
    this.setState({dob:entry})
  }

  // PASSWORD
  if ( val == 'password' ) {
this.setState({password:entry})
    if ( entry.length < 6 ) {
      this.setState({pe:'Password must be 6 characters long'})
    }else{this.setState({pe:''})}

  }

  // CONFIRM PASSWORD
  if ( val == 'cpassword' ) {
    this.setState({cpassword:entry})
    if ( entry == password ) {
      this.setState({cpe:'Matched'})
      setTimeout(()=>{
        this.setState({cpe:''})
      },1000)
    }else{this.setState({cpe:'Password Not Matched..'})}

  }
  }

// SIGNUP
  signUp(){
            let { name, email, gender, dob,  password, cpassword, country, region } = this.state;
            console.log('regis>>==>>',name,email,password,cpassword)
            
            if( name && email && gender && dob && password && cpassword && country && region ){

              fire.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
                console.log('user',user);
                let userDetail = {
                  name: name,
                  email:email,
                  gender:gender,
                  dob:dob,
                  password:password,
                  country:country,
                  region:region
                }
                let cuid = fire.auth().currentUser.uid ;
                db.ref('users').child(cuid).set(userDetail)
                this.props.userSignUp({signUp:true})
                this.props.history.push('/dashboard')
              }).catch(err=>{
                this.setState({
                  error:err.message
                })
              })
            }else{this.setState({error:'Please fill the form correctly'})}
           console.log('this.props', history);
           


  }


  render() {
    const { country, region, name, dob, gender, error, ne, em, ge, pe, cpe } = this.state;
    console.log('regName>>>', dob,gender)
    return (
      


      <div style={{ width:'60%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignContent:'center', alignItems: 'center', margin: '1%', color: 'black',alignContent:'center' }}>
{/* 
        SignUp
               
                <input style={{ width: '80%' }} placeholder='Full_Name' onChange={(e) => { this.inputs('fname',e.target.value) }} />
{em && <div style ={{color:'red', fontSize:'14px'}} >{em}</div>}
                <input style={{ width: '80%' }} placeholder='Email'  />
        
               {/* Gender 
               <div style={{ width: '80%', backgroundColor: 'white', display: 'flex', flexDirection: 'row' }}>
              
               {/* <Label style={{ marginRight: '10%', fontSize: '16px' }} for="exampleSelect">Gender</Label> 
            
              </div>

        <div style={{ width: '80%', backgroundColor: 'white', marginTop:'1%',marginBottom:'1%', display: 'flex', flexDirection: 'row', overflow: 'hidden', fontSize: '16px', font: '15px', }}>
          {/* Age 
          { <Label style={{  fontSize: '12px',display:'inline',marginTop:'10px' }} for="exampleSelect">Date of birth</Label>
         /* <div style={{ width: '10px', display: 'flex', justifyContent: 'right', alignItems: 'right', alignContent: 'right', paddingLeft: '5%', }} >
            <DatePicker style={{ width: '80%' }}
              selected={this.state.startDate}
              onChange={this.handleChange}
              />
          </div> 
          <input onChange={(e) => { this.inputs('dob', e.target.value) } } style={{ width: '75%', marginLeft:'20px',backgroundColor:'white' }} type='date' placeholder='Date of birth'/>
        </div>

        {/* Countries 
        {/* <Label style={{marginRight:'10%',fontSize:'16px'}}  for="exampleSelect">Country</Label> 

        <CountryDropdown style={{ width: '80%', height: '30px',backgroundColor:'white' }}
          value={country}
          onChange={(val) => this.selectCountry(val)} />
        <RegionDropdown style={{ width: '80%', height: '30px',backgroundColor:'white' }}
          country={country}
          value={region}
          onChange={(val) => this.selectRegion(val)} />

        {/* password 
        {pe && <div style ={{color:'red', fontSize:'14px'}} >{pe}</div>}
        <input onChange={(e) => { this.inputs('password', e.target.value) }} type='password' placeholder='password' style={{ width: '80%', height: '30px' }} />

        {/* confirm password 
        {cpe && <div style ={{color:'red', fontSize:'14px'}} >{cpe}</div>}
        <input onChange={(e) => { this.inputs('cpassword', e.target.value) }} type='password' placeholder='confirm password' style={{ width: '80%', height: '30px' }} />

        <button onClick={()=>{this.signUp()}}>Submit</button>
      */}
        <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h5 text-center mb-4 ">Sign up</p>
            <div className="grey-text">
              <MDBInput
               onChange={(e) => { this.inputs('fname',e.target.value) }}
               label="Your name"
               icon="user"
               style={{margin:'0',paddingLeft:'15%'}}
               group
               type="text"
               validate
               error="wrong"
               success="right"
               />
               {ne && <div style ={{color:'red', fontSize:'14px',marginTop:"-19px"}} >{ne}</div>}
              <MDBInput
              onChange={(e) => { this.inputs('email',e.target.value) }}
              style={{margin:'0',paddingLeft:'15%',marginTop:"-10px"}}
                label="Your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              {em && <div style ={{color:'red', fontSize:'14px',marginTop:"-19px"}} >{em}</div>}
              
              <select placeholder="hhg" onChange={(e) => { this.inputs('gender',e.target.value) }} style={{ width: '100%', height: '30px',backgroundColor:'white',borderWidth:'0px 0px 1px 0px',outline:'none' }} type="select" name="select" id="exampleSelect">
                 <option>Select Gender</option>
                 <option>Male</option>
                 <option>Female</option>
                 <option>Others</option>
              </select>
              {ge && <div style ={{color:'red', fontSize:'14px'}} >{ge}</div>}
              
              
               {/* Age */}
          <Label style={{  fontSize: '12px',display:'inline',marginTop:'20px',borderWidth:'0px 0px 2px 0px solid',outline:'none' }} for="exampleSelect">Date of birth</Label>
        
           <input onChange={(e) => { this.inputs('dob', e.target.value) } } style={{ width: '100%',marginTop:'10px',backgroundColor:'white',borderWidth:'0px 0px 2px 0px ',outline:'none' }} type='date' placeholder='Date of birth'/>
       


  {/* Countries */}

        <CountryDropdown style={{ width: '100%', height: '30px',marginTop:'20px',backgroundColor:'white',borderWidth:'0px 0px 1px 0px ',outline:'none' }}
          value={country}
          onChange={(val) => this.selectCountry(val)} />
        <RegionDropdown style={{ width: '100%', height: '30px',marginTop:'20px',backgroundColor:'white',borderWidth:'0px 0px 1px 0px ',outline:'none' }}
          country={country}
          value={region}
          onChange={(val) => this.selectRegion(val)} />


<MDBInput
onChange={(e) => { this.inputs('password', e.target.value) }}
label="Your password"
icon="lock"
group
style={{margin:'0',paddingLeft:'15%'}} 
  type="password"
  validate
/>
{pe && <div style ={{color:'red', fontSize:'14px',marginTop:"-19px"}} >{pe}</div>}
              <MDBInput
              onChange={(e) => { this.inputs('cpassword', e.target.value) }}
              label="Confirm your password"
              icon="exclamation-triangle"
              style={{margin:'0',paddingLeft:'15%'}}
                group
                type="password"
                validate
                error="wrong"
                success="right"
              />
              {cpe && <div style ={{color:'red', fontSize:'14px',marginTop:"-19px"}} >{cpe}</div>}
            </div>
            <div className="text-center">
            {error && <div style ={{color:'red', fontSize:'14px',marginTop:"-19px"}}>{error}</div>}
              <MDBBtn onClick={()=>{this.signUp()}} style={{margin:'0',padding:'0'}} >Register</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  
      </div>




    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userSignUp : ( data ) => dispatch(updateUser(data))
  }
}


export default connect( null, mapDispatchToProps )(Signup)