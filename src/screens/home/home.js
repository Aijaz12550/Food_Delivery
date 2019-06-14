import React, { Component } from 'react'
import Food from '../../images/food.jpg'

export default class Home extends Component {
    constructor(){
        super();
        this.state = {}
    }

    render(){
        return(
            <div style={{width:'100%',display:'row'}}>
               
                <div className='product'>
                    <img style={{width:'170px'}} src={Food} />
                   <p>Name:ABC</p>
                   <p>Price:$$$</p>
                   <p>type:large</p>
                   <h5>Buy Now</h5>
                </div>
                {/* ===================== */}

                <div className='product'>
                    <img style={{width:'170px'}} src={Food} />
                   <p>Name:ABC</p>
                   <p>Price:$$$</p>
                   <p>type:large</p>
                   <h5>Buy Now</h5>
                </div>
                {/* ===================== */}

                <div className='product'>
                    <img style={{width:'170px'}} src={Food} />
                   <p>Name:ABC</p>
                   <p>Price:$$$</p>
                   <p>type:large</p>
                   <h5>Buy Now</h5>
                </div>
                {/* ===================== */}

                <div className='product'>
                    <img style={{width:'170px'}} src={Food} />
                   <p>Name:ABC</p>
                   <p>Price:$$$</p>
                   <p>type:large</p>
                   <h5>Buy Now</h5>
                </div>
                {/* ===================== */}

                <div className='product'>
                    <img style={{width:'170px'}} src={Food} />
                   <p>Name:ABC</p>
                   <p>Price:$$$</p>
                   <p>type:large</p>
                   <h5>Buy Now</h5>
                </div>
                {/* ===================== */}

                <div className='product'>
                    <img style={{width:'170px'}} src={Food} />
                   <p>Name:ABC</p>
                   <p>Price:$$$</p>
                   <p>type:large</p>
                   <h5>Buy Now</h5>
                </div>
                {/* ===================== */}

                <div className='product'>
                    <img style={{width:'170px'}} src={Food} />
                   <p>Name:ABC</p>
                   <p>Price:$$$</p>
                   <p>type:large</p>
                   <h5>Buy Now</h5>
                </div>
                {/* ===================== */}

            </div>
        )
    }
}