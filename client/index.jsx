import React from 'react';
import ReactDOM from 'react-dom';
import Stars from './components/shared/Stars.jsx';
import ClickableStars from './components/shared/ClickableStars.jsx';
import text, {CText, CTextDemoView} from './components/shared/CText.jsx';
import Ratings from './components/ratings/Ratings.jsx';
import Product from './components/product/Product.jsx';
import Related from './components/related/Related.jsx';




class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 22128,
    };
    this.handleChange =this.handleChange.bind(this)
  }
  handleChange(e) {
    this.setState({id:e})

  }

  render() {
    log(this.state.id)
    return (
    <div>
      <Product />
      <Related id={this.state.id} changeProduct={this.handleChange}/>
      <Ratings id={this.state.id}/>
    </div>);




}
}

ReactDOM.render(<App />, document.getElementById('app'));