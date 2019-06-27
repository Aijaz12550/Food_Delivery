
import React , { Component} from 'react';
import  ModalExample from '../home/addRestaurant'
import { fire } from '../../config/firebase'
import history from '../../config/history'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      user:null,
      rView:false,uView:true
    };
   
  }
  
 
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  signout(){
    fire.auth().signOut().then(()=>{
      this.props.history.push('/dashboard')
    })
  }
  componentDidMount(){
    
    setTimeout(()=>{
      if(fire.auth().currentUser){
        console.log('user',fire.auth().currentUser);
        
        fire.database().ref('/restaurants').once('value').then(snap=>{
          
        this.setState({user:fire.auth().currentUser.uid})
      })
    }
    },5000)
    
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

  view(value){

    if(value == 'rView'){

      fire.database().ref('view/').set('rView')
      this.setState({rView:true,uView:false})
      // this.props.dekhao('rView')
      this.props.history.push('/approved')
    }
    else{
      fire.database().ref('view/').set('uView')
      this.setState({rView:false,uView:true})
      // this.props.dekhao('uView')
      this.props.history.push('/dashboard')
    }

  }
  // modal(){
  //   this.setState({modal:t})
  // }
  render() {
    console.log('this.props........header',this.props);
    
    // setTimeout(()=>{

    //   var user = fire.auth().currentUser
    // },3000)
   let { user, rView, uView } = this.state;
    return (
      <div style={{width:'100%'}}  >
        <Navbar  style={{backgroundColor:'blue',color:'white'}} caret  light expand="md">
          <NavbarBrand style={{color:'white'}} href="/">Food_Delivery_App</NavbarBrand>
          <NavbarToggler style={{color:'rgba(255, 255, 253, 0.637)',backgroundColor:'white'}}  />
          
          <Collapse style={{}} isOpen={this.state.isOpen} navbar>
            <Nav style={{color:'white'}} className="ml-auto" navbar>
              {!user &&<div style={{display:'flex',flexDirection:'row'}}>

              <NavItem >
                <NavLink style={{color:'white'}} onClick={()=>{this.props.history.push("/dashboard/signup")}}>SignUp</NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{color:'white'}}onClick={()=>{this.props.history.push("/dashboard/SignIn")}} >SignIn</NavLink>
              </NavItem>
              </div>}
              {user && <Nav>

              <NavItem>
                <NavLink style={{color:'white'}} onClick={()=>{this.signout()}} >SignOut</NavLink>
              </NavItem>
              <UncontrolledDropdown  >
                <DropdownToggle style={{color:'white',marginRight:'120px'}} nav caret>
                  
                </DropdownToggle>
                <DropdownMenu style={{color:'white',marginRight:'100px'}} right>
                  
                  
                  
{rView &&
  <DropdownItem onClick={()=>{this.view('uView')}}>
    User View
                  </DropdownItem>
}
                 
{uView &&
                  <DropdownItem onClick={()=>{this.view('rView')}}>
                   Restuarant View
                  </DropdownItem>
}

                  <DropdownItem divider />
                  <DropdownItem>
                    History
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              </Nav>
            }
            
{/* < ModalExample  color={'white'} style={{color:'white',}} /> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}