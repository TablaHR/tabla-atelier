import React, { Component } from 'react';
import $ from 'jquery';
import Card from './Card.jsx';
import Box from './Box.jsx';
// import axios from 'axios';
import Swiper from "swiper";
// Import Swiper styles

import 'swiper/swiper-bundle.css';
export default class Related extends Component {
  constructor(props){
    super(props);
    this.state={
      error: null,
      isLoading : true,
      items : [],

    }
  }


  componentDidMount() {
    $.ajax({
      url: 'http://localhost:3000/related',
      data: {id:this.props.id},
      method: "POST",
      success: (res)=>{
        this.setState({
          isLoading : false,
          items: res
        })
      }
    })

  }
  tan(){
    console.log(this);
    this.setState({display:'block'})
  }

  hide(){
      this.setState({display:'none'})
  }
  render() {
    const {error, isLoading, items } = this.state;
    let cardStyle = {
      float:'left',
      width:'20%',
      height: '300px',
      borderBlockColor:'black',
      border:'2px solid',
      margin: '10px',
    }
    if (error) {
      return <div>Error: {error} </div> ;
    } else if (isLoading) {
      return <div>Loading...</div>;
    } else {
    return (
      <div>
        <h1 style={{color:'gray'}}>RELATED PRODUCTS</h1>
        <div>List of related ID</div>
        {items.map(item =>(
          <div>
          <div style = {cardStyle}>
          <Card id={item} main={this.props.id}/>
          </div>
          </div>
        ))}
      </div>
    )
    }
  }
}
