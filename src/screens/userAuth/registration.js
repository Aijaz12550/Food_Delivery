import React ,{Component} from 'react'
import Navbar from '../../navbar'
import {Label,Input} from 'reactstrap'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";


export default class Signup extends Component{
            constructor(props){
                super();
                this.state = {
                    startDate: new Date()
                  };
                  this.handleChange = this.handleChange.bind(this);
            }
            selectCountry (val) {
                this.setState({ country: val });
              }
            
              selectRegion (val) {
                this.setState({ region: val });
              }
            handleChange(date) {
                this.setState({
                  startDate: date
                });
              }
            render(){
                const { country, region } = this.state;
                return(
                    
                        <div style={{width:'40%',backgroundColor:'white',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',margin:'1%',padding:'1%',color:'black',flexGrow:'1',zIndex:'4000',boxShadow:'3px 3px 4px 4px rgb(240, 237, 237)'}}>
SignUp
                        <input style={{width:'80%'}} placeholder = 'Full_Name'/>
                        <input style={{width:'80%'}} placeholder = 'Email'/>
{/* Gender */}
<div  style={{width:'80%',backgroundColor:'white',display:'flex',flexDirection:'row'}}>

                        <Label style={{marginRight:'10%',fontSize:'16px'}} for="exampleSelect">Gender</Label>
          <Input style={{width:'80%',height:'30px'}} type="select" name="select"  id="exampleSelect">
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </Input>
</div>
<div  style={{width:'80%',backgroundColor:'white',margin:'1%',display:'flex',flexDirection:'row',overflow:'hidden',fontSize:'16px',font:'15px',paddingRight:'-100px',}}>

          {/* Age */}
          <Label style={{marginRight:'10%',fontSize:'16px',}}  for="exampleSelect">Age</Label>
          <div style={{width:'10px',display:'flex',justifyContent:'right',alignItems:'right',alignContent:'right',paddingLeft:'5%',}} >
          <DatePicker style={{width:'80%'}}
        selected={this.state.startDate}
        onChange={this.handleChange}
        />
        </div>
</div>
      
          {/* Countries */}
          {/* <Label style={{marginRight:'10%',fontSize:'16px'}}  for="exampleSelect">Country</Label> */}
        
<CountryDropdown style={{width:'80%',height:'30px'}}
          value={country}
          onChange={(val) => this.selectCountry(val)} />
        <RegionDropdown style={{width:'80%',height:'30px'}}
          country={country}
          value={region}
          onChange={(val) => this.selectRegion(val)} />

          {/* password */}
          <input type = 'password' placeholder='password' style={{width:'80%',height:'30px'}}/>

          {/* confirm password */}
          <input type = 'password' placeholder='confirm password' style={{width:'80%',height:'30px'}}/>
                       
                       <button onClick={this.props.jab}>Submit</button>
                        </div>

                    
                   
                )
            }
}