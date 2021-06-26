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
        }
    }

    switchStyle(idx) {
        this.setState({
            selectedStyle: this.state.styles[idx]
        });
    }

    componentDidMount() {
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

    render() {
        return(
            <div className="product-master-grid">
                <div className="leading" >
                    <ImageGallery product={this.state.selectedStyle}/>
                </div>

                <div className="trailing">
                    <ProductInfo product={this.state.activeProduct}/>
                    <StyleSelector styles={this.state.styles} switchStyle={(idx) => {this.switchStyle(idx)}}/>
                    <AddToCart product={this.state.selectedStyle}/>
                </div>
            </div>
        )
    }
}

export default Product;