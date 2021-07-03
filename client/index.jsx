import React from 'react';
import ReactDOM from 'react-dom';
import Ratings from './components/ratings/Ratings.jsx';
import Product from './components/product/Product.jsx';
import Related from './components/related/Related.jsx';
import Header from './components/shared/Header.jsx';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 22122,
      announcement: 'Welcome to the World\'s Largest Clothing Superstore!'
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeToNextProduct = this.changeToNextProduct.bind(this);
  }

  handleChange(e) {
    this.setState({id:e})
  }

  changeToNextProduct() {
    this.setState({id: this.state.id + 1});
  }

  render() {
    return (
<<<<<<< HEAD
    <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{maxWidth: "1000px"}}>
        <Product id={this.state.id}/>
        <Related id={this.state.id} changeProduct={this.handleChange}/>
        <Ratings id={this.state.id}/>
      </div>
    </div>
);
=======
    <div>
<<<<<<< HEAD
      <Header announcement={this.state.announcement} changeToNextProduct={this.changeToNextProduct} />
      <Product id={this.state.id}/>
=======
      <button onClick={() => {this.setState({id: this.state.id + 1})}}>Rerender</button>
      {/* <Product id={this.state.id}/> */}
>>>>>>> main
      <Related id={this.state.id} changeProduct={this.handleChange}/>
      <Ratings id={this.state.id}/>
    </div>);
>>>>>>> clickHelper
  }
}

ReactDOM.render(<App />, document.getElementById('app'));