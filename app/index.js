let React = require('react');
let ReactDOM = require('react-dom');
require('./index.css');
var App = require('./components/App')

ReactDOM.render(
  <App />,
  document.getElementById('app')
)

//so the only responsibility of index.js is to render App