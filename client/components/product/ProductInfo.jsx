import React from 'react';
import Stars from '../shared/Stars.jsx';
import {CText} from '../shared/CText.jsx';
import './css/ProductInfo.css';



class ProductInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    getProductRating() {
        return (
        <div className="ratingbutton">
            <div className="griditem">
                <Stars className="griditem" rating={this.props.product ? this.props.product.rating:3.65}/>
            </div>
            <div className="griditem" style={{textAlign: "left"}}>
                <a style={{color: "grey"}} className={`review-link read-reviews`} href={"#reviews"}>Read Reviews</a>
            </div>
        </div>
        )
    }

    render() {
        return (
            <div className="productinfo">
                {this.getProductRating()}
                <CText text={this.props.product ?  this.props.product.category.toUpperCase():"CATEGORY"} style="thin" color="grey"/>
                <CText text={this.props.product ?  this.props.product.name:"NAME"} style="bold" size={2}/>
                <CText text={this.props.product ?  ("$" + this.props.product.default_price):"$0"} style="thin" size={0.75} color="grey"/>
            </div>
        )
    }
}

export default ProductInfo;