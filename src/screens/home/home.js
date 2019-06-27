import React, { Component } from 'react'
import Food from '../../images/food.jpg'
import { fire, db } from '../../config/firebase'
import { log } from 'util';
import Chip from '@material-ui/core/Chip';
import Header from '../hdr/hdr'
import { Spinner } from 'reactstrap';
import Burger from '../../images/burger.jpg'
import Slider from './slider'

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol,MDBRow } from 'mdbreact';



export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            rDetail:[],
            dash:true,
            detail:false,
            map:false,
            price:null,
            lat: null,
            lng: null,
            val:null,
            key:null,
            rName:null,
            spin:false,
            result:[],
            text:'',
            i:null,

        }
        this.detail=this.detail.bind(this)
    }
    componentDidMount(){
        let { rDetail } = this.state;
        fire.database().ref('restaurant').on('value',(snap)=>{
            // console.log('home>>>',snap.child('restaurant').child('rec').val())
            // rDetail.push(snap.val())
            let userArray = [];
            let data = snap.val();

        for (let key in data) {
            data[key].adKey = key;
            userArray.push(data[key]);
        }
            this.setState({rDetail:userArray})
        })
// console.log('userArray',userArray);
navigator.geolocation.getCurrentPosition((location) => {
    this.setState({
        lat: location.coords.latitude,
        lng: location.coords.longitude
    })
});

    }

    detail(val, indx,key,rName,price){
        this.setState({detail:true,val,key,rName,spin:true,price})
        let uid = fire.auth().currentUser.uid;
        setTimeout(()=>{

            
            if(uid){

                let detArray =[]
                fire.database().ref('restaurant').child(key).child('detail').child(val).once('value').then(snap=>{
                    console.log('fff>>>', snap.val());
                    this.setState({dArray:snap.val()})
                })
            }
        },6000)
        // let { rDetail } = this.state;
        // console.log('detttt>>==',rDetail[indx].detail,rDetail[indx].detail.val,val);
        // let det = rDetail[indx].detail
        // for (let key in det) {
        //     det[key].adKey = key;
        //     detArray.push(det[key]);
        //     for(var i=0;i<detArray.length;i++){
        //         if(detArray[i].name == val ){
                    
        //             this.setState({dArray:detArray})
                    
        //         }
        //     }
        // }
        // console.log('det>>>====',detArray);
        
    //    var a = val
        // let price = detArray.price;
        // let coldrink = detArray.coldrink;
        // let delivery = detArray.delivery;
        // let img = detArray.img;

       
    }

    orderNow(){
        // console.log('currentU>>===>>',fire.auth().currentUser.uid);
        let userUid = fire.auth().currentUser.uid; 
if(userUid){
    this.setState({
        map:true,detail:false,dash:false
    })     
}
}

done(){
    let { rDetail, detail, dArray, lat, lng , dash, map, val, key,rName,price } = this.state;
    let userUid = fire.auth().currentUser.uid; 
    let det={
        rName,
        lat,
        lng,
        userUid,
        key,
        price,
        val
    }
    let detUser={
        rName,
        lat,
        lng,
        userUid,
        key,
        price,
        status:'pending'
    }
    fire.database().ref('restaurant').child(key).child('detail').child(val).child('orders').child(userUid).set(det).then((suc)=>{
// console.log('done',suc);

fire.database().ref('restaurant').child(key).child('pending').child(userUid).set(det)
    })
    fire.database().ref('users').child(userUid).child('pendingList').child(val).set(detUser).then((suc)=>{
        // console.log('done',suc);
        this.setState({
            map:false,detail:false,dash:true
        }) 
            })
}
getValue(v){
    // console.log('vvvvvvv',v);
    
        this.setState({
            lat :v.latLng.lat(),
            lng : v.latLng.lng(),
        })
    }
    search(e){
        const { rDetail } = this.state;
        const text = e
        let resArray =[]
        
     
         for(var i=0;i<rDetail.length;i++){
            // console.log('search',rDetail[i].rec)
            let sr = []
                for (let key in rDetail[i].rec) {
                    rDetail[i].rec[key].adKey = key;
                    sr.push(rDetail[i].rec[key]);
                    
                }
               const res = sr.filter((i)=>{
                    // console.log('sr',sr,'iii',i);
    
                            return (i.name).toLowerCase().substring(0, i.length).indexOf(text.toLowerCase()) != -1 
                        })
                        
                        let result = res.length ? resArray.push(rDetail[i]) : ''
                        // console.log('res>>>>>>>>.',res);
                        // console.log('result=====',result);
                        // console.log('resArray.',resArray);
                        
                        
                    }

                            this.setState({
                                result:resArray,text
                            })
            // console.log('mmmmm>>',rec);
            // const array =  rec.filter( (yu,i) => {
            //       console.log('filter>>>',yu);
            //       console.log('yuu>>',yu);
            //       return  (yu.name).toLowerCase().substring(0, yu.length).indexOf(text.toLowerCase()) != -1
            //     })
            //     console.log('res',rDetail[indx].rec);
            //     let sr = []
            //     for (let key in rDetail[indx].rec) {
            //         rDetail[indx].rec[key].adKey = key;
            //         sr.push(rDetail[indx].rec[key]);
                    
            //     }
            //     return sr == array
                
           
            // console.log('sr',sr);
            // console.log('result',result);
      

            //     this.setState({
            //         result,text,
            // })
          
    }
    render(){
        let { rDetail, detail, dArray, lat, lng , dash, map, spin,text,result,i } = this.state;
        // console.log('render>>>', rDetail);
        // const classes = useStyles();
        // console.log('lat>>',lat,'lng>>>',lng);
        const items = text ? result : rDetail
        // console.log('Current_user_uid>>',fire.auth().currentUser.uid);
        console.log('this.props........home',this.props);
        
        return(
            <div style={{padding:'2%'}} >
<input onChange={(e)=>{this.search(e.target.value)}} type='search' placeholder='Search Recipes here' style={{width:'50%',border:'ridge 1px #296',outline:'none',padding:'10px',borderRadius:'35px'}}/>
              <div>
            
                  <Chip
                  className={'chip'}
                  onClick={()=>{this.search('beef roll')}}
                  onBlur={()=>{this.setState({text:null})}}
                  style={{margin:'2% 2% 0% 1%',color:'#296',border:'none',backgroundColor:'white',boxShadow: '1px 1px 1px 1px gray'}}
                 label={'beef roll'}
                 clickable={true}
                 variant="outlined"
                />
                <Chip
                  onClick={()=>{this.search('tikka')}}
                  onBlur={()=>{this.setState({text:null})}}
                  style={{margin:'2% 2% 0% 1%',color:'#296',border:'none',backgroundColor:'white',boxShadow: '1px 1px 1px 1px gray'}}
                 label={'tikka'}
                 clickable={true}
                 variant="outlined"
                />
                <Chip
                  onClick={()=>{this.search('boti')}}
                  onBlur={()=>{this.setState({text:null})}}
                  style={{margin:'2% 2% 0% 1%',color:'#296',border:'none',backgroundColor:'white',boxShadow: '1px 1px 1px 1px gray '}}
                 label={'boti'}
                 clickable={true}
                 variant="outlined"
                />
                <Chip
                  onClick={()=>{this.search('kabab')}}
                  onBlur={()=>{this.setState({text:null})}}
                  style={{margin:'2% 2% 0% 1%',color:'#296',border:'none',backgroundColor:'white',boxShadow: '1px 1px 1px 1px gray '}}
                 label={'kabab'}
                 clickable={true}
                 variant="outlined"
                />
                  
              </div>
            <div style={{width:'70%',display:'flex',flexDirection:'column',marginTop:'3%',float:'left',}}>
                {/* <Header/> */}
                {
                    !detail && dash &&
               <div>
                    { rDetail.length && items.map((val,indx)=>{
                        console.log('val.detail',val.detail);
                        
                        let rec = []
                        for (let key in val.detail) {
                            val.detail[key].adKey = key;
                            rec.push(val.detail[key]);
                        }
                        console.log('kkk>>',val)
                        return(
                            <div className='product' style={{display:'flex', flexDirection:'row',backgroundColor:"white",}}>

                            <div style={{display:'flex',flexDirection:'row'}}>
                            
                            <img style={{width:'170px',borderRadius:'10px'}} src={Food} />
                            <div style = {{ display:'flex',flexDirection:'column',width:'100%'}} >
                  
                            
                           <p style={{marginLeft:'20px'}}>{val.name} </p>
                 
                           <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',flexFlow:'row wrap',wordWrap:'break-word',width:'100%'}}>
                   { val.rec &&
                    
                   
                    rec.map((a)=>{
                        console.log('aaaaaaaaaaaa>>>',a);
                        
                       return <Chip
                       onClick={()=>{this.detail(a.adKey, indx, val.adKey,val.name,a.price )}}
                       
                       style={{margin:'3%',color:'#296'}}
                       label={a.adKey}
                    //    label={'2.3'}
                       clickable={true}
                       variant="outlined"
                       />
                    })
                }
                        </div>
                   
                    </div>
                   
                        </div>
                </div>
                    )
                    })}
                    </div>
                }

                {/* === */}
            
                
                {/* ===================== */}
                
                {/* <div className='product' style={{display:'flex', flexDirection:'row'}}>
                <img style={{width:'170px'}} src={Food} />
                    <p>Name:ABC</p>
                    <p>Price:$$$</p>
                    <p>type:large</p>
                   <h5>Buy Now</h5>
                </div>
                {/* ===================== */}


               
{detail && dArray &&  <div>
   
   

    <p onClick={()=>{this.setState({detail:false})}}>{'< Back'}</p>
        <img height='200' width='200' src={dArray.url}/>
    <p>{"Price: $"+dArray.price}</p>
    <p>{"Category: "+dArray.cat}</p>
    <p>{"Name: "+dArray.recN}</p>
    {/* <p>{dArray.price}</p> */}
    <button style={{width:'100px',margin:'2%'}} onClick={()=>{this.orderNow()}}>Order Now</button>
    


</div>}
{
    !rDetail.length && 
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
{
    !dArray && spin &&
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
            {map &&
            <div style={{width:'400px'}}>
                <p>Please set delivery location.</p>
             <MyMapComponent
            
  isMarkerShown
  location={{ lat, lng }}
  func = {(v) => this.getValue(v)}
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/><button style={{width:'100px',margin:'2%'}} onClick={()=>{this.done()}} >Done</button>
</div>
}
{/* <div style={{float:'right',width:'28%',height:'400px',marginTop:'3%',padding:'12px',boxShadow: '3px 3px 3px 3px lightgray'}}>
    <div style={{width:'28%',height:'340px'}} >

    </div>
    <textarea style={{float:'bottom'}} ></textarea>
</div> */}

<MDBRow>
        {/* <MDBCol>
          <MDBCard wide>
            <MDBCardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/People/6-col/img%20%283%29.jpg" />
            <MDBCardBody cascade>
              <MDBCardTitle>MDBCard title</MDBCardTitle>
              <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
              <MDBBtn href="#">MDBBtn</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol> */}
        <MDBCol>
          <MDBCard narrow>
            <MDBCardImage cascade className="img-fluid" src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(147).jpg" />
            <MDBCardBody cascade>
              <MDBCardTitle>Eaton BBQ</MDBCardTitle>
              <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
              <MDBBtn href="#">Detail</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol>
          <MDBCard cascade>
            <MDBCardImage cascade className="img-fluid" src={Burger} />
            <MDBCardBody cascade>
              <MDBCardTitle>Aijaz Burger</MDBCardTitle>
              <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
              <MDBBtn href="#">Detail</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
<div style={{width:'100%',margin:'0',padding:'0',display:'flex',flexDirection:'row'}}>

     <Slider/>
     <Slider/>
     <Slider/>
</div>
                </div>
        )
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
