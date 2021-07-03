import React from 'react';
import './css/BottomDetails.css'
import {CText} from '../shared/CText.jsx';

class BottomDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  leading() {
    return(
      <div className="leading-details">
        <CText text={this.props.product ? this.props.product.slogan:""} style="bold"></CText>
        <CText text={this.props.product ? this.props.product.description:""} style="light"></CText>
      </div>
    )
  }

  trailing() {

    if (this.props.product) {
      var features = this.props.product.features.map((feature, idx) => {
        return <li key={idx}>{feature.feature}</li>
      }).slice(0, 4)
    }
    return <div className="trailing-details">
      <ul>
        {features}
      </ul>
    </div>
  }

  render() {
    return(<div className="bottom-details-grid">
      {this.leading()}
      {this.trailing()}
    </div>)
  }
}

export default BottomDetails;