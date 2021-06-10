import React from 'react';
import ReactDOM from 'react-dom';

import Stars from './components/shared/Stars.jsx';
import ClickableStars from './components/shared/ClickableStars.jsx'
import text, {CText, CTextDemoView} from './components/shared/CText.jsx';
import Ratings from './components/ratings/Ratings.jsx';
import Product from './components/product/Product.jsx';


class App extends React.Component {
  constructor() {
    super();

  }
 
  render() {
    return (
    <div>
      <Product />
      <Ratings />
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));