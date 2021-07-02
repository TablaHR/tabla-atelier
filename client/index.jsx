import React from 'react';
import ReactDOM from 'react-dom';
import Ratings from './components/ratings/Ratings.jsx';
import Product from './components/product/Product.jsx';
import Related from './components/related/Related.jsx';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 22122,
    };
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({id:e})
  }

  render() {
    return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{maxWidth: "1000px"}}>
        <Product id={this.state.id}/>
        <Related id={this.state.id} changeProduct={this.handleChange}/>
        <Ratings id={this.state.id}/>
      </div>
    </div>
);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));