import React from 'react';
import Signup from './screens/userAuth/registration'
import Login from './screens/userAuth/signin'
import Loader from './images/loader.gif'
import Header from './screens/hdr/hdr'
import Home from './screens/home/home'
import logo from './logo.svg';
import './App.css';
import Taba from './screens/hdr/tab'
// redux
import Navigations from './config/router'
import RestaurantView from './screens/restaurantView/router'
import store from './store/index'
import { Provider } from 'react-redux'
import { fire } from './config/firebase'

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


class App extends React.Component {

  constructor(){
    super();

    this.state = { SignUp:true,loader:false,rView:true,uView:false}
  }
submit(){
  let { SignUp, loader } = this.state;
  this.setState({SignUp:true})
  this.setState({loader:true})
  setTimeout(()=>{
    this.setState({loader:false})
  },5000)
}

view(val){
  if(val == 'rView'){
    this.setState({rView:true,uView:false})
    
  }
  else{
    this.setState({rView:false,uView:true})
    
  }
}

componentDidMount(){
  
  fire.database().ref('view/').on('value',snap=>{
    console.log('view....fire',snap.val());
    if(snap.val() == 'rView'){
      this.setState({rView:true,uView:false})
    }
    else{
      this.setState({rView:false,uView:true})
      
    }
  })
}
  render(){
    let { SignUp, loader, rView, uView } = this.state;

    return (
      <Provider store={store}>

      <div className="App">
 {/* <MyMapComponent
  isMarkerShown
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/> */}
{/* <Header
dekhao={(e)=>{this.view(e)}}
/> */}
      {/* <header className="App-header"> */}
        
        
        {/* <input placeholder=' Search Food' type='search'/> */}
        
       {/* </header>   */}

  {uView && <Navigations/>}

  {rView &&   <RestaurantView/>}
       
      <div>

      </div>
{
  // !loader &&
  // <div className='regDiv' >
  //      { !SignUp && 
  //       <Signup
  //       jab={()=>{this.submit()}}
  //       />}
  //   {/* { SignUp && !loader && <Login/> } */}

  //       </div>
      }
      {/* { loader && 
      <img  src={Loader}/>
  
       } */}

    </div>
</Provider>
  );
}
}
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={4}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && 
    <Marker
     draggable={true}
      position={{ lat: -34.397, lng: 150.644 }} 
      />}
  </GoogleMap>
))

export default App;
