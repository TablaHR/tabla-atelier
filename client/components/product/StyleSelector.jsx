import React from 'react';
import {CText} from '../shared/CText.jsx';
import './css/StyleSelector.css';

class StyleSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(event) {
        this.props.switchStyle(event.target.className.split(" ")[1]);
    }

    renderAvailableStyles() {
        if (this.props.styles) {
            return this.props.styles.map((element, idx) => {
                return (
                    <div key={idx} idx={idx} className="style-div" onClick={(e) => {this.handleClick(e)}}>
                        <img key={idx} idx={idx} className={"dot " + idx} src={element.photos[0].url || "./sample.jpeg"}></img>
                        <span className={this.props.stylesIdx == idx ? "selected":""}></span>
                    </div>
                )
            });
        }
    }

    render() {
        return (
            <div>
                <CText text="Style >" style="bold"/>
                <div className="stylesgrid">
                    {this.renderAvailableStyles()}
                </div>
            </div>
        )
    }
}

export default StyleSelector;