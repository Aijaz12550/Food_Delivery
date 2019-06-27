import React , { Component } from 'react'
import { fire } from '../../config/firebase'
import Chip from '@material-ui/core/Chip';
import { Spinner } from 'reactstrap';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Burger from '../../images/burger.jpg'


export default class MyReaquest extends  Component{
constructor(){
    super();
    this.state={
        pList:null,lat:24.7766,lng:67.88888

        
    }
}
        componentDidMount(){
            if(fire.auth().currentUser){

                let userUid = fire.auth().currentUser.uid; 
                let pendingList = []
                fire.database().ref('users').child(userUid).child('pendingList').on('value',(snap)=>{
                    
            console.log('home>>>',snap.val())
            // rDetail.push(snap.val())
            let data = snap.val();

            for (let key in data) {
            data[key].adKey = key;
            pendingList.push(data[key]);
        }
            this.setState({pList:pendingList})
        })
    
    }
        }
        latlong(lat,lng){
            this.setState({lat,lng})

        }
        render(){
        let { pList, lat, lng } = this.state;
        console.log('plist>>>>>>>>',pList);
        

        
        // const lat = pList && pList[0].lat;
        // const lng = pList && pList[0].lng;
        return(
            
            <div style={{marginBottom:'250px'}}>
                {
                    pList &&
                    <div>
                         <div style={{width:'100%',display:'flex',flexDirection:'column',backgroundColor:"white",marginTop:'3%'}}>
                {/* <Header/> */}
                {
                    
                    <div>
                    { pList.map((val,indx)=>{
                        console.log('kkk>>',val)
                        return(
                            <div className='product' style={{display:'flex', flexDirection:'row'}} onChange={()=>{this.latlong(val.lat,val.lng)}}>
                            <div style={{display:'flex',flexDirection:'row'}}>
                            
                            <img style={{width:'170px',borderRadius:'10px'}} src={Burger} />
                            <div style = {{ display:'flex',flexDirection:'column',width:'100%'}} >
                  
                            
                           <p style={{marginLeft:'20px'}}>{val.rName} </p>
                 
                           <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
                   
                       <Chip
                      
                       style={{margin:'3%',color:'#296'}}
                       label={val.adKey}
                       clickable={true}
                       
                       
                       variant="outlined"
                       />
                       {/* <p>Delivery Location</p>
                       <p>{val.lat}</p> */}
                       <div>
                           {
                              val.price && 'price : $'+val.price
                           }
                           </div>

                           <div style={{marginLeft:'25px',float:'right'}}>
                           {
                              val.price && 'status : '+val.status
                           }
                           </div>
                    
                        </div>
                   
                    </div>
                   
                        </div>
                </div>
                    )
                    })}
                    </div>
                }
                {/* <MyMapComponent
  
  isMarkerShown
  location={{ lat, lng }}
  
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/> */}
             


 
            </div>
            
   
                        
                        
                        </div>
                
            }
            {
                !pList &&
                <div>
        <Spinner type="grow" color="primary" />
        <Spinner type="grow" color="secondary" />
        <Spinner type="grow" color="success" />
        <Spinner type="grow" color="danger" />
        <Spinner type="grow" color="warning" />
        <Spinner type="grow" color="info" />
        <Spinner type="grow" color="light" />
        <Spinner type="grow" color="dark" />
      </div>
            }
            </div>
        )
    }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: props.location.lat, lng: props.location.lng }}>
    {props.isMarkerShown && 
    <Marker
     draggable={true}
   
     position={{ lat: props.location.lat, lng: props.location.lng }} 
     
        //  console.log('loc ===>', loc.latLng.lat(), loc.latLng.lng())}
                    
                    
    
    //   position={{ lat: -34.397, lng: 150.644 }} 
      />
       } 
  </GoogleMap>
))
