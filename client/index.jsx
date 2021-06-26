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
      test: 0,
    };
    this.handleChange =this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({id:e})
  }

  render() {
    return (
    <div>
      <button onClick={() => {this.setState({id: this.state.id + 1})}}>Rerender</button>
      <Product />
      <Related id={this.state.id} changeProduct={this.handleChange}/>
      <Ratings id={this.state.id}/>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));