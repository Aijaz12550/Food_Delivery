import React from 'react';
import Signup from './screens/userAuth/registration'
import Login from './screens/userAuth/signin'
import Loader from './images/loader.gif'
import Header from './screens/header/header'
import Home from './screens/home/home'
import logo from './logo.svg';
import './App.css';


class App extends React.Component {

  constructor(){
    super();

    this.state = { SignUp:false,loader:false,}
  }
submit(){
  let { SignUp, loader } = this.state;
  this.setState({SignUp:true})
  this.setState({loader:true})
  setTimeout(()=>{
    this.setState({loader:false})
  },5000)
}

  render(){
    let { SignUp, loader } = this.state;

    return (
      <div className="App">
 <Header/>
      {/* <header className="App-header">
        <div>
         
          <input placeholder=' Search Food' type='search'/>
        </div>
      </header> */}
       {/* <Home/> */}
      
{
  !loader &&
  <div className='regDiv' >
       { !SignUp && 
        <Signup
        jab={()=>{this.submit()}}
        />}
    { SignUp && !loader && <Login/> }

    { loader && 
    <img style={{width:'60%'}} src={Loader}/>

     }
        </div>
      }

    </div>
  );
}
}

export default App;
