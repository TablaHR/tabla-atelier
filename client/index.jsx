import React from 'react';
import ReactDOM from 'react-dom';
import Ratings from './components/ratings/Ratings.jsx';
import Product from './components/product/Product.jsx';
import Related from './components/related/Related.jsx';
import Header from './components/shared/Header.jsx';
import { updateActiveProduct } from './serverHelpers/productServerHelper.js'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 22122,
      announcement: 'Welcome to the World\'s Largest Clothing Superstore!',
      test: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeToNextProduct = this.changeToNextProduct.bind(this);
  }

  handleChange(e) {
    updateActiveProduct(e)
      .then(() => {
        this.setState({id:e})
      });
  }

  changeToNextProduct() {
    this.setState({id: this.state.id + 1});
  }

  render() {
    return (
    <div>
      <Header announcement={this.state.announcement} changeToNextProduct={this.changeToNextProduct} />
      <Product id={this.state.id}/>
      <Related id={this.state.id} changeProduct={this.handleChange}/>
      <Ratings id={this.state.id}/>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));