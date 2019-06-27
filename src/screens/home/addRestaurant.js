
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,DropdownItem } from 'reactstrap';
import { fire } from '../../config/firebase'

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      rName:null,
      recN:null,
      cat:null,
      price:null,
      imgUrl:null,
      pic:null,
      lat:null,
      lng:null,
      showNameError:false,
      
    };

    this.toggle = this.toggle.bind(this);
  }

modal(){
  this.setState({modal:true})
}

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  submit(){
      let { rName, recN, cat, price, img,lat,lng, url } = this.state;
      let userUid = fire.auth().currentUser.uid
      
     let det = {
       rName,
       recN,
       cat,
       price,
       url
     }
     let loc = { lat, lng };
let key =fire.database().ref().push()
      fire.database().ref('restaurantNames/').push({name:rName})
      fire.database().ref('restaurant/'+userUid).child('location').push(loc)
      fire.database().ref('restaurant/'+userUid+'/detail/'+recN).set(det)
     rName && fire.database().ref('restaurant').child(userUid).child('name').set(rName)
      fire.database().ref('restaurant/'+userUid+'/rec').push({name:recN})
this.toggle()

  }

  //image
   uploadImage(a) {
       let { pic, imgUrl } = this.state;
    var storageRef = fire.storage().ref();
    var imagesRef = storageRef.child('images/ads_' + Math.random().toString().substring(2, 6) + '.jpg');
    var file = a // use the Blob or File API
    if (file == undefined) {
        this.setState({
            title: "Please Upload a valid image",
        });
       
    }
    else {
      
            imagesRef.put(file).on('state_changed',
            (snap)=>{

            },
            (error)=>{

            },
            ()=>{
              imagesRef.getDownloadURL().then(url=>{
                console.log('url',url);
                this.setState({url})
                
              })
            }
            )
                
        
        
      }
}
componentDidMount(){
  navigator.geolocation.getCurrentPosition((location) => {
    this.setState({
        lat: location.coords.latitude,
        lng: location.coords.longitude
    })
});
}
getValue(v){
  console.log('vvvvvvv',v);
  
      this.setState({
          lat :v.latLng.lat(),
          lng : v.latLng.lng(),
      })
  }
checkReastaurantName(inp){
  let registerdNames = [];
  fire.database().ref('restaurantNames').once('value').then(snap=>{
    let data = snap.val();
    for (let key in data) {
      data[key].adKey = key;
      registerdNames.push(data[key]);
    }
    console.log('registerdNames>>>>>',registerdNames);
    if(inp){
      this.setState({showNameError:true})

          for(var i=0;i<registerdNames.length;i++){
            if(registerdNames[i].name.toLowerCase() == inp.toLowerCase() ){
              this.setState({nameAvailable:false})
            }else{
              this.setState({nameAvailable:true})
            }
          }
        }
        
  })
}
  render() {
      let { imgUrl,lat, lng, nameAvailable, showNameError } = this.state;
      console.log('img>>>>>>>',imgUrl);
      let u = localStorage.getItem('url');
    return (
      <div>
        <DropdownItem onClick={()=>{this.setState({modal:!this.state.modal})}}>Add Restaurant</DropdownItem>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} charCode="X">
          <p>Restaurant detail</p>
            <hr/>
          <p style={{fontSize:'15px'}}>Set Your Restaurant Location</p>
          <MyMapComponent
            
            isMarkerShown
            location={{ lat:this.state.lat, lng:this.state.lng }}
            func = {(v) => this.getValue(v)}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `50px`,width:'100px' }} />}
            containerElement={<div style={{ height: `190px`,width:'100%' }} />}
            mapElement={<div style={{ height: `100%`,width:'100%' }} />}
          />
          <div style={{display:'flex',flexDirection:'row',fontSize:'15px'}}>

          <p>{'Lat = '+lat}</p>
          <p style={{marginLeft:'4%'}}>{'Lng = '+lng}</p>
          </div>
          <hr/>
          <p style={{fontSize:'15px',fontWeight:'none'}}>Add Restaurant picture..</p>
          <input style={{fontSize:'15px',fontWeight:'none',backgroundColor:' rgba(241, 241, 241, 0.637)',width:'80%'}}  type="file" />
            <input style={{fontSize:'15px',fontWeight:'none',width:'80%',marginTop:'3%'}} onChange={(e)=>{this.setState({rName:e.target.value})}} onBlur={(e)=>{this.checkReastaurantName(e.target.value)}} type ='text' placeholder='Restaurant Name' /><br/>
          {showNameError && <div>{nameAvailable ? <p style={{color:'green',fontSize:'15px'}}> This Name is Availabe.. </p>:<p style={{color:'red',fontSize:'12px'}}> This Name is already registerd. Please enter a diferent name.</p>}</div>}
          </ModalHeader>
          <ModalBody>
          <p>Set Please fill reciepe detail..</p>
              <div>
            Add picture of reciepe...<br/>
            <input style={{fontSize:'15px',fontWeight:'none',backgroundColor:' rgba(241, 241, 241, 0.637)',width:'80%'}}  onChange={(e)=>{this.uploadImage(e.target.files[0])}} type ='file' placeholder='Add Certificate' />
            <input style={{fontSize:'15px',fontWeight:'none',width:'80%',marginTop:'3%'}}  onChange={(e)=>{this.setState({recN:e.target.value})}} type ='text' placeholder='Recipe Name' /><br/>
            <input style={{fontSize:'15px',fontWeight:'none',width:'80%',marginTop:'3%'}}  onChange={(e)=>{this.setState({cat:e.target.value})}} type ='text' placeholder='Category' /><br/>
            <input style={{fontSize:'15px',fontWeight:'none',width:'80%',marginTop:'3%',marginBottom:'3%'}}  onChange={(e)=>{this.setState({price:e.target.value})}} type ='Number' placeholder='Price in USD' /><br/>
              <img src={this.state.url} height='100' width='150' />
              </div>
            
            </ModalBody>
          <ModalFooter>
            <Button color="blue" style={{padding:'0'}} onClick={()=>{this.submit()}}>Submit</Button>{' '}
            {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: props.location.lat, lng: props.location.lng }}>
    {/* {props.isMarkerShown &&  */}
    <Marker
     draggable={true}
    //  draggable={true} 
     position={{ lat: props.location.lat, lng: props.location.lng }} 
     onDragEnd={(v) =>  props.func(v)}
        //  console.log('loc ===>', loc.latLng.lat(), loc.latLng.lng())}
                    
                    
    
    //   position={{ lat: -34.397, lng: 150.644 }} 
      />
      {/* } */}
  </GoogleMap>
))


export default ModalExample;