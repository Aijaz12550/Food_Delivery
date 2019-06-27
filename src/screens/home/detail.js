import React , { Component } from 'react'
import { MDBFreeBird, MDBInput, MDBCol, MDBRow, MDBCardBody, MDBCardTitle, MDBBtn, MDBContainer, MDBEdgeHeader,MDBCardImage } from
"mdbreact";
import { MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, } from 'mdbreact';

import Burger from '../../images/burger.jpg'
import Rest from '../../images/restaurant.jpg'
import {  MDBCard,  MDBCardText,  } from 'mdbreact';
import { fire } from '../../config/firebase';


export default class Detail extends Component{
    constructor(){
        super();
        this.state={
          modal14: false,
          modal15: false,
        }
    }

    toggle = nr => () => {
      let modalNumber = 'modal' + nr
      this.setState({
        [modalNumber]: !this.state[modalNumber]
      });
    }
    componentDidMount(){

      if(fire.auth().currentUser){
        let uid = fire.auth().currentUser.uid;

        fire.database().ref('restaurant/'+ uid).on('value',snap=>{
          let detArray = [];
          let data = snap.val();
          
          for (let key in data.detail) {
            data.detail[key].adKey = key;
            detArray.push(data.detail[key]);
          }
          this.setState({data,detArray})
          console.log('detail..snap.val()',snap.val());
          // console.log('detArray',detArray);
          
          
        })
      }
    }

    edit(key){
      this.setState({modal14:true,key})
      // let uid =fire.auth().currentUser.uid
      //  fire.database().ref('restaurant/'+ uid+'/detail/'+key).update()
    }

    uploadImage(a) {
      let { pic, imgUrl } = this.state;
   var storageRef = fire.storage().ref();
   var imagesRef = storageRef.child('images/ads_' + Math.random().toString().substring(2, 6) + '.jpg');
   var file = a // use the Blob or File API
   if (file == undefined) {
       this.setState({title: "Please Upload a valid image",});
      
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

saveChenges(){
  let { recN, cat, price, url, key } = this.state;
  let obj = { recN, cat, price, url, key }
  let uid = fire.auth().currentUser.uid;

  if( recN && cat && price && url && key){

    fire.database().ref('restaurant/'+ uid+'/detail/'+key).remove();
    fire.database().ref('restaurant/'+ uid+'/detail/'+recN).set(obj)
    .then(success=>{
      this.setState({modal14:false,key:'',recN:'',cat:'',price:'',url:''})
    }).catch(error=>{
      this.setState({error:error.message})
    })
  }else{
    this.setState({error:'fill the form correctly..'})
  }
}

del(key){
  let uid = fire.auth().currentUser.uid;
  fire.database().ref('restaurant/'+ uid+'/detail/'+key).remove();
}

add(){
  let { recN, cat, price, url, } = this.state;
  let obj = { recN, cat, price, url,  }
  let uid = fire.auth().currentUser.uid;

  if( recN && cat && price && url){

    fire.database().ref('restaurant/'+ uid+'/detail/'+recN).set(obj)
    .then(success=>{
      this.setState({modal14:false,key:'',recN:'',cat:'',price:'',url:''})
    }).catch(error=>{
      this.setState({error:error.message})
    })
  }else{
    this.setState({error:'fill the form correctly..'})
  }
}
    render(){
      let { data, detArray, error } = this.state;
        return(
            <div style={{width:'100%',marginTop:'-30px',marginBottom:'100px'}}  >
                {/* Header */}
                <MDBContainer  className="mt-3">
        <MDBEdgeHeader style={{display:'flex',flexDirection:'row'}} color="mdb-color darken-2">

<MDBCardImage cascade height='600' className="img-fluid"  src={Rest} />
<MDBCardImage cascade className="img-fluid"  src={Rest} />
<MDBCardImage cascade className="img-fluid"  src={Rest} />
<MDBCardImage cascade className="img-fluid"  src={Rest} />

{/* <img src={Burger} /> */}
        </MDBEdgeHeader>
        <MDBFreeBird>
          {/* <MDBRow> */}
            <MDBCol md="4" lg="4" className="mx-auto float-none white z-depth-1 py-1 px-1">
              <MDBCardBody>
                <MDBCardTitle>{data && data.name} </MDBCardTitle>
                <p className="pb-4">Detail About Restaurant</p>
                <MDBBtn style={{padding:'0'}}  onClick={()=>{this.setState({modal15:true})}}>Add Recipe</MDBBtn>
              </MDBCardBody>
            </MDBCol>
          {/* </MDBRow> */}
        </MDBFreeBird>
      </MDBContainer>
  
                {/* ===end=== */}

                <div style={{margin:'4%'}} >

<MDBRow >
{detArray && detArray.map((val, indx)=>{
  console.log('mappppppaaa>>>',val);
  
  return(
    <MDBCol>
    <MDBCard wide>
      <MDBCardImage cascade className="img-fluid" src={val.url} />
      <MDBCardBody cascade>
        <MDBCardTitle>{val.adKey}</MDBCardTitle>
        <MDBCardText>{'Price = $'+val.price}</MDBCardText>
        <MDBCardText>Delivery : <p style={{color:'green',display:'inline'}}>Free</p></MDBCardText>
        <MDBCardText>Distance from your current location : <p style={{color:'green',display:'inline'}}>10km</p></MDBCardText>
        <MDBBtn style={{padding:'0'}} onClick={()=>{this.edit(val.adKey)}}>Edit</MDBBtn>
        <MDBBtn style={{padding:'0'}}  color='danger' onClick={()=>{this.del(val.adKey)}} >Delete</MDBBtn>
      </MDBCardBody>
    </MDBCard>
        
     
    </MDBCol>
    )
    })}
      </MDBRow>

      {/* modal edit */}
      <MDBContainer>
        {/* <MDBBtn color="primary" onClick={this.toggle(14)}>MDBModal</MDBBtn> */}
        <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
          <MDBModalHeader toggle={this.toggle(14)}>{data && data.name}</MDBModalHeader>
          <MDBModalBody>
            <input style={{display:'block',width:'100%'}} type='file' onChange={(e)=>{this.uploadImage(e.target.files[0])}} />
            <MDBInput onChange={(e)=>{this.setState({recN:e.target.value})}} style={{display:'block',width:'100%',margin:'1%'}} type='text' label='Recipe Name' />
            <MDBInput onChange={(e)=>{this.setState({cat:e.target.value})}} style={{display:'block',width:'100%',margin:'1%'}} type='text' label='Recipe category' />
            <MDBInput onChange={(e)=>{this.setState({price:e.target.value})}} style={{display:'block',width:'100%',margin:'1%'}} type='number' label='price in USD ($3)' />
</MDBModalBody>
<p>{ error && error}</p>
          <MDBModalFooter>
            <MDBBtn style={{padding:'0'}} color="secondary" onClick={this.toggle(14)}>Close</MDBBtn>
            <MDBBtn style={{padding:'0',width:'50%'}} onClick={()=>{this.saveChenges()}} color="primary">Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
      {/* ====end=== */}

{/* modal edit */}
      <MDBContainer>
        {/* <MDBBtn color="primary" onClick={this.toggle(14)}>MDBModal</MDBBtn> */}
        <MDBModal isOpen={this.state.modal15} toggle={this.toggle(15)} centered>
          <MDBModalHeader toggle={this.toggle(15)}>{data && data.name}</MDBModalHeader>
          <MDBModalBody>
            <input style={{display:'block',width:'100%'}} type='file' onChange={(e)=>{this.uploadImage(e.target.files[0])}} />
            <MDBCardImage cascade className="img-fluid" src={this.state.url} />
            <MDBInput onChange={(e)=>{this.setState({recN:e.target.value})}} style={{display:'block',width:'100%',margin:'1%'}} type='text' label='Recipe Name' />
            <MDBInput onChange={(e)=>{this.setState({cat:e.target.value})}} style={{display:'block',width:'100%',margin:'1%'}} type='text' label='Recipe category' />
            <MDBInput onChange={(e)=>{this.setState({price:e.target.value})}} style={{display:'block',width:'100%',margin:'1%'}} type='number' label='price in USD ($3)' />
</MDBModalBody>
<p>{ error && error}</p>
          <MDBModalFooter>
            <MDBBtn style={{padding:'0'}} color="secondary" onClick={this.toggle(15)}>Close</MDBBtn>
            <MDBBtn style={{padding:'0',width:'50%'}} onClick={()=>{this.add()}} color="primary">Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
      {/* ====end=== */}
                </div>
            </div>
        )
    }
}