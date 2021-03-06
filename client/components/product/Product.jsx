import React from 'react';

import ProductInfo from './ProductInfo.jsx'
import StyleSelector from './StyleSelector.jsx'
import './css/Product.css'
import AddToCart from './AddToCart.jsx'
import ImageGallery from './ImageGallery.jsx'
import { getActiveProductInfo, getActiveProductStyles } from '../../serverHelpers/productServerHelper.js'
import BottomDetails from './BottomDetails.jsx'
import {CText} from '../shared/CText.jsx';

class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedStyle: null,
            styles: null,
            selectedStyleIdx:0,
            activeProduct: null,
            fullscreen: false,
            called: false,
            addToCartGif: false,
        }
    }

    switchStyle(idx) {
        this.setState({
            selectedStyle: this.state.styles[idx],
            selectedStyleIdx: idx
        });
    }

    updateComponent() {
        getActiveProductInfo(this.props.id).then((data) => {
            log(data)
            this.setState({activeProduct: data});
        });
        getActiveProductStyles(this.props.id).then((data) => {
            this.setState({
                styles: data.results,
                selectedStyle: data.results[0]
            });
        })
    }

    componentDidMount() {
        this.updateComponent();
    }

    componentDidUpdate(prevProps, prevState, other) {
        if (prevProps.id !== this.props.id) {
            this.updateComponent();
        }
    }

    showAddToCartGif() {
        this.setState({addToCartGif: true})
        setTimeout(() => {this.setState({addToCartGif: false})}, 4000)
    }

    viewToggle() {
        this.setState(prevState => ({fullscreen: !prevState.fullscreen}))
    }

    render() {
        return(
            <div className="product">
                <div className="product-master-grid" style={this.state.fullscreen ? {gridTemplateColumns: "2fr 0fr"}:{gridTemplateColumns: "2fr 1fr"}}>
                    <div className="leading" >
                        <ImageGallery product={this.state.selectedStyle} stylesIdx={this.state.selectedStyleIdx} styles={this.state.styles} screenToggle={() => {this.viewToggle()}} switchStyle={(idx) => {this.switchStyle(idx)}} fullscreen={this.state.fullscreen}/>
                    </div>

                    <div className="trailing" style={this.state.fullscreen ? {display: "none"}:{gridTemplateColumns: "inline-block"}}>
                        <div className="add-to-cart-gif" style={{display: this.state.addToCartGif ? "inline-block":"none"}}>
                            <img src='./addToCart.gif' style={{zIndex: 10, height: 100, width: 100, position: "absolute", marginTop: "500px"}}></img>
                            <div style={{marginTop: "530px", position: "absolute", marginLeft: "120px"}}>
                                <CText text="Added to Cart!" style="bold" size={1}></CText>
                            </div>
                        </div>

                        <ProductInfo product={this.state.activeProduct}/>
                        <StyleSelector styles={this.state.styles} switchStyle={(idx) => {this.switchStyle(idx)}} stylesIdx={this.state.selectedStyleIdx}/>
                        <AddToCart product={this.state.selectedStyle} addToCartGif={() => {this.showAddToCartGif()}}/>
                    </div>
                </div>

                <BottomDetails product={this.state.activeProduct}></BottomDetails>
            </div>

        )
    }
}

export default Product;