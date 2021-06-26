/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React, {Component} from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Comparing from './Comparing.jsx';
import './Card.css';
import Stars from '../shared/Stars.jsx';

function SimpleDialog(props) {
  const {onClose, selectedValue, open, item, cur} = props;
  const handleClose = () => {
    onClose(selectedValue);
  };
  return (
    <Dialog scroll='paper' onClose={handleClose} open={open} fullWidth
      maxWidth="md">
      <DialogTitle><div>Comparing</div>
        <div style={{display: 'grid',
          gridTemplateColumns: '30% 40% 30%'}}>
          <div>{item.name}</div>
          <div> </div>
          <div style={{textAlign: 'right'}}>{cur.name}</div>
        </div>

      </DialogTitle>
      <DialogContent>
        <Comparing item= {item} cur={cur}/>
      </DialogContent>
    </Dialog>
  );
}

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state={
      error: null,
      isLoading: true,
      item: null,
      image: null,
      price: null,
      discountPrice: null,
      display: false,
      ratings: {},
    };
    this.handleClickOpen=this.handleClickOpen.bind(this);
    this.handlClose=this.handlClose.bind(this);
  }

  handlClose() {
    this.setState({display: false});
  }

  handleClickOpen() {
    this.setState({display: true});
  }


  componentDidMount() {
    if (this.props.itemId !== undefined){
    axios.all([
      axios.post(`${process.env.EXPRESS_SERVER}/card`, {id: this.props.itemId}),
      axios.post(`${process.env.EXPRESS_SERVER}/review/meta`, {id: this.props.itemId}),
      axios.post(`${process.env.EXPRESS_SERVER}/cardimage`, {id: this.props.itemId}),
    ]).then(axios.spread((data1, data2, data3) => {
      const res = data3.data;
      let cur = res.results[0];
      this.setState({
        isLoading: false,
        item: data1.data,
        price: data1.data.default_price,
        image: cur.photos[0].thumbnail_url,
        ratings: data2.data.ratings,
        price: cur['original_price'],
        discountPrice: cur['sale_price'],
      });
      for (let i=0; i<res.results.length; i++) {
        cur = res.results[i];
        // console.log(this.props.id,cur)
        if (cur['default?']) {
          this.setState({
            image: cur.photos[0].thumbnail_url,
            price: cur['original_price'],
            discountPrice: cur['sale_price'],
          });
          break;
        }
      }
    }));
    }
  }
  render() {
    if (this.props.cur === 'blank') {
      return <div className='card' >
      <img src = {"./sample.jpeg"} onClick={()=>{this.props.add(this.props.item_id)}} ></img>
      <div>Add current product!</div>
    </div>

    }
    // eslint-disable-next-line max-len
    const {error, isLoading, item, image, price, discountPrice, display, ratings} = this.state;
    const cur = this.props.cur;
    let rating = 0;
    let Star;
    if (Object.keys(ratings).length !== 0) {
      let numberOfrating=0;
      let sum = 0;
      for (const key in ratings) {
        if (Object.prototype.hasOwnProperty.call(ratings, key)) {
          numberOfrating += Number(ratings[key]);
          sum += Number(key) * Number(ratings[key]);
        }
      }
      rating = sum / numberOfrating;
      Star=<div><Stars rating = {rating} /></div>;
    } else {
      Star = <div></div>;
    }

    if (error) {
      return <div>Error: {error} </div>;
    } else if (isLoading) {
      return <div>Loading...</div>;
    } else {
      let displayPrice;
      if (discountPrice === null ) {
        displayPrice= <div>${price}</div>;
      } else {
        displayPrice= <div style={{display: 'flex'}}>
          <div style = {{color: 'red'}}>${discountPrice} </div>
          <div style ={{textDecoration: 'line-through'}}>  ${price}</div>
        </div>;
      }
      return (

        <div className='card' >
          <img src = {image} onClick={()=>this.props.changeProduct(this.props.itemId)}></img>
          <div className="icon"
          onClick={this.props.add||this.handleClickOpen}
          // onClick={()=>{
          //   this.props.add();
          // }}
          >{this.props.icon}</div>
          <div>{item.category}</div>
          <div>{item.name}</div>
          <div>{displayPrice}</div>
          {Star}
          <br />
          <SimpleDialog open={display}
            onClose={this.handlClose}
            item={item}
            cur ={cur}/>
        </div>


      );
    }
  }
}
