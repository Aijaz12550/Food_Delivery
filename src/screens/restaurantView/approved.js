import React , { Component } from 'react'
import { fire } from '../../config/firebase'
import Chip from '@material-ui/core/Chip';

export default class Pending extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    componentDidMount(){
        setTimeout(()=>{
            if(fire.auth().currentUser){

                let cuid = fire.auth().currentUser.uid
                fire.database().ref('restaurant').child(cuid).child('approved').on('value',(snap)=>{
                let approved = []
               
                let data = snap.val();

        for (let key in data) {
            data[key].adKey = key;
            approved.push(data[key]);
        }
console.log('pending',approved);
this.setState({approved})
            })
                }
        },5000)
    }
    deliver(val,indx,adkey,rec){
        let { approved } = this.state;
        if(fire.auth().currentUser){

            let cuid = fire.auth().currentUser.uid
            let obj = approved[indx]
            // console.log('pending[indx]..approve>>',pending[indx]);
            // console.log('1.',fire.database().ref('restaurant/'+cuid));
            // console.log('2.',adkey);
            // console.log('31.',fire.database().ref('restaurant/'+cuid).child('approved'));
            // console.log('4.',obj);
            
            
            fire.database().ref('restaurant/'+cuid).child('deliverd').child(adkey).set(obj)
            .then(success=>{
                    fire.database().ref('restaurant').child(cuid).child('approved').child(adkey).remove();
                    fire.database().ref('users/'+adkey+'/pendingList/'+rec).update({status:'Deliverd'});
                })
                
            }
    }

    render(){
        let { approved } = this.state
        return(
            <div  style={{marginBottom:'350px'}}>

                <h1>Approved List</h1>
                { approved && approved.map((val,indx)=>{
                       
                        return(
                            <div className='product' style={{display:'flex', flexDirection:'row',backgroundColor:"white",marginTop:'3%'}}>
{/* 
                            <div style={{display:'flex',flexDirection:'row'}}>
                            <div style = {{ display:'flex',flexDirection:'row',width:'100%'}} > */}
                  
                            <div style = {{ display:'flex',flexDirection:'row',width:'25%'}} >
                           <p style={{marginLeft:'20px',width:'100%'}}>{val.rName} </p>
                           </div>
                 
                           <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',flexFlow:'row wrap',wordWrap:'break-word',width:'20%',marginLeft:'3%'}}>
                  
                 <Chip
                       style={{margin:'3%',color:'#296'}}
                       label={val.val}
                       clickable={true}
                       variant="outlined"
                       />
                    </div>
                    <div style={{width:'15%'}}>
                        <p>Rs : 250</p>
                        </div>
                   
                    <div style={{width:'13%'}}>
                        <button>Location</button>
                        </div>
                        <div style = {{ display:'flex',flexDirection:'row-reverse',marginLeft:'4%',width:'13%'}}>
                        <button onClick={()=>{this.deliver('Aijaz',indx,val.adKey,val.val)}} >Deliverd</button>
                        </div>
                    </div>
                   
            //             </div>
            //  </div>
                    )
                    })
                    }
            </div>
        )
    }
}