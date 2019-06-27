import React from 'react';
import Dashboard from '../screens/home/home';
import SignUp from '../screens/userAuth/registration'
import myRequests from '../screens/home/myRequests'
import Drop from '../screens/hdr/dropdown'
import SignIn from '../screens/userAuth/signin'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Tab from '../screens/hdr/tab'
import Header from '../screens/hdr/hdr'
// import Pending from '../screens/myRestaurant/pending'
import history from './history'
import Footer from '../screens/home/footer'
import Detail from '../screens/home/detail'
import Modal from '../screens/home/addRestaurant'

function Navigations() {
    
    return (
        //this.props.history.push('/dashboard')
        <Router history={history}>
            {/* optional */}

                <Route       path="/" component={Header} />
            
            {/* <Link style={{textDecoration:"none",marginRight:'20px'}} to="/header">Header</Link> */}
              <div style={{width:'80%',display:'flex',justifyContent:'center',alignItems:'center',textDecoration:"none",padding:'5px',marginBottom:'3%',marginTop:'10px',backgroundColor:'white',boxShadow: '3px 3px 2px 2px',}}>
                  {/* <div style={{float:'right',display:'flex',justifyContent:'flex-end',}}><Drop /></div> */}
                <Link className={'link'} style={{textDecoration:"none",marginRight:'20px'}} to="/dashboard">Dashboard</Link>
                {/* <Link style={{textDecoration:"none"}} to="/">SignUp</Link> */}
                 {/* <Link style={{textDecoration:"none",marginRight:'20px'}} to="/pending">pending</Link> */}
                <Link className={'link'} style={{textDecoration:"none",marginRight:'20px'}} to="/dashboard/myRequests">My Requests</Link>
                {/* <Link className={'link'} style={{textDecoration:"none",marginRight:'20px'}} to="/detail">detail</Link> */}
                <Link className={'link'} style={{textDecoration:"none",marginRight:'20px'}} ><Modal/></Link>

                  </div>
                
          

          
            {/* optional */}

            
            {/* <div style={{display:'flex', margin: '1%',backgroundColor:'',justifyContent:'center',alignItems:'center',alignContent:'center', padding: '1%', color: 'black',  boxShadow: '3px 3px 4px 4px rgb(240, 237, 237)',}}> */}
                <Route style={{padding:'2%'}} exact path="/dashboard" component={Dashboard} />
                <Route exact path="/dashboard/signup" component={SignUp} />
                <Route exact path="/dashboard/myRequests" component={myRequests} />
                <Route exact path="/dashboard/SignIn" component={SignIn}  />
                <Route  path="/detail" component={Detail}  />
                <Route  path="/" component={Footer}  />


                {/* <Route  exact path="/pending" component={Pending} /> */}
                
                {/* <Route exact path="/profile" component={Profile} />
                <Route path="/profile/:username" component={IndividualProfile} /> */}
                {/* this.props.match.params.username */}
            {/* </div> */}
        </Router>
    );
}

export default Navigations;