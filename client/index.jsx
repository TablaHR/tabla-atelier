import React from 'react';
import ReactDOM from 'react-dom';
import text, {CText, CTextDemoView} from './components/shared/text.jsx';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <h1>Hi</h1>

  }
}

ReactDOM.render(<App />, document.getElementById('app'));