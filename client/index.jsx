import React from 'react';
import ReactDOM from 'react-dom';

import Stars from './components/shared/Stars.jsx';
import ClickableStars from './components/shared/ClickableStars.jsx'
import text, {CText, CTextDemoView} from './components/shared/CText.jsx';
import Questions from './components/q&a/Questions.jsx';
import Ratings from './components/ratings/Ratings.jsx';


class App extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (<div>
      <Questions />
      <CTextDemoView />
      <Stars rating={0.5} />
      <ClickableStars />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));