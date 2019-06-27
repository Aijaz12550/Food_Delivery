import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Pending from './pending'
import Approved from './approved'
import deliverd from './deliverd'
import Header from '../hdr/hdr'
import Detail from '../home/detail'
import Footer from '../home/footer'
import  ModalExample from '../home/addRestaurant'

function RestaurantView() {
    
    return (
        //this.props.history.push('/dashboard')
        <Router >
            {/* optional */}

            <Route path='/' component={Header}/>

              <div style={{width:'85%',display:'flex',justifyContent:'center',textDecoration:"none",padding:'3px',backgroundColor:'rgba(255, 255, 253, 0.637)',boxShadow: '3px 3px 4px 4px rgb(240, 237, 237)',}}>
              <Link className={'link'} style={{textDecoration:"none",marginRight:'20px',width:'25%',textAlign:'center'}} to="/detail">Restaurant Detail</Link>
                <Link className={'link'} style={{textDecoration:"none",marginRight:'20px',width:'15%',textAlign:'center'}} to="/pending">Pending</Link>
                <Link className={'link'} style={{textDecoration:"none",marginRight:'20px',width:'15%',textAlign:'center'}} to="/approved">Approved</Link>
                <Link className={'link'} style={{textDecoration:"none",marginRight:'20px',width:'15%',textAlign:'center'}} to="/deliverd">Deliverd</Link>
                <Link className={'lin'} style={{textDecoration:"none",marginRight:'20px',width:'15%',textAlign:'center'}} ><ModalExample/></Link>
               
                  </div>
                
          

          
            {/* optional */}

            
            <div style={{width:'85%', margin: '1%',backgroundColor:'', padding: '1%', color: 'black',  boxShadow: '3px 3px 4px 4px rgb(240, 237, 237)',}}>
            <Route exact path="/detail" component={Detail} />
                <Route style={{marginBottom:'50px'}} exact path="/pending" component={Pending} />
                <Route exact path="/approved" component={Approved} />
                <Route exact path="/deliverd" component={deliverd} />
                {/* <Route exact path="/addRestaurant" component={ModalExample} /> */}
                <Route  path="/" component={Footer} />
                
            </div>
        </Router>
    );
}

export default RestaurantView;