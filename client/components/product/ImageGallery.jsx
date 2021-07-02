import React from 'react';
import './css/ImageGallery.css';
import ImageCarosel from './ImageCarosel.jsx'

class ImageGallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        }
    }

    render() {
        return(
            <div className="img-gallery">
                <img className="featured-image" src={this.props.product ? this.props.product.photos[0].url:'./sample.jpeg'}></img>
                <h1 className="expand-button" onClick={this.props.screenToggle}>+</h1>
                <ImageCarosel stylesIdx={this.props.stylesIdx} styles={this.props.styles} switchStyle={(idx) => {this.props.switchStyle(idx)}}></ImageCarosel>
            </div>
        )
    }
}

export default ImageGallery;