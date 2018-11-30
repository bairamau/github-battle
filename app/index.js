let React = require('react');
let ReactDOM = require('react-dom');
require('./index.css');
// state
// lifecycle events
// UI - necessary
class App extends React.Component {
  render() {
    return (
      <div>Hello Vorld!</div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
