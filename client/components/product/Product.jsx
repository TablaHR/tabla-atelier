import React from 'react';

import ProductInfo from './ProductInfo.jsx'
import StyleSelector from './StyleSelector.jsx'
import './css/Product.css'
import AddToCart from './AddToCart.jsx'
import ImageGallery from './ImageGallery.jsx'
import { getActiveProductInfo, getActiveProductStyles } from '../../serverHelpers/productServerHelper.js'

class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedStyle: null,
            styles: null,
            activeProduct: null,
            fullscreen: false,
        }
    }

    switchStyle(idx) {
        this.setState({
            selectedStyle: this.state.styles[idx]
        });
    }

    updateComponent() {
        getActiveProductInfo().then((data) => {
            this.setState({activeProduct: data});
        });
        getActiveProductStyles().then((data) => {
            this.setState({
                styles: data.results,
                selectedStyle: data.results[0]
            });
        })
    }

    componentDidMount() {
        this.updateComponent();
    }

    getSnapshotBeforeUpdate() {
        // this.updateComponent();
        return null;
    }

    viewToggle() {
        this.setState(prevState => ({fullscreen: !prevState.fullscreen}))
        log(this.state.fullscreen)
    }

    render() {
        return(
            <div className="product-master-grid" style={this.state.fullscreen ? {gridTemplateColumns: "2fr 0fr"}:{gridTemplateColumns: "2fr 1fr"}}>
                <div className="leading" >
                    <ImageGallery product={this.state.selectedStyle} screenToggle={() => {this.viewToggle()}}/>
                </div>

                <div className="trailing" style={this.state.fullscreen ? {display: "none"}:{gridTemplateColumns: "inline-block"}}>
                    <ProductInfo product={this.state.activeProduct}/>
                    <StyleSelector styles={this.state.styles} switchStyle={(idx) => {this.switchStyle(idx)}}/>
                    <AddToCart product={this.state.selectedStyle}/>
                </div>
            </div>
        )
    }
}

export default Product;