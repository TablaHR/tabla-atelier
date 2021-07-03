import React from 'react';
import ReactDOM from 'react-dom';
import './css/ClickableStars.css'

class ClickableStars extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this)
    this.state = {
      stars:[],
    }
  }

  // TODO: CANNOT HANDLE MULTIPLE SIMULTANEOUS VIEWS, WILL OVERRIDE OTHER COMPONENT
  onClick(e) {
    var elements = [...document.getElementsByClassName('c-star')];
    var newElements = elements.forEach(ele => {
      if (ele.id <= e.target.id) {
        ele.className = "c-star checked";
      } else {
        ele.className = "c-star";
      }
    });

    // Pass super function if exists
    if (this.props.onClick) { this.props.onClick(e); }
  }

  componentDidMount() {
    this.renderNStars();
  }

  renderNStars() {
    var stars = [];
    for (var i=0; i<this.props.numStars; i++) {
      stars.push(<span className="c-star" id={i} key={i} onClick={this.onClick}>&#9734;</span>)
    }
    this.setState({stars});
  }

  render() {
    return(
      <div className="clickable-stars">
        {this.state.stars}
      </div>
    )
  }
}

export default ClickableStars;