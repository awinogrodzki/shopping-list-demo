import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import ShoppingList from './pages/ShoppingList';

moment.locale('pl');

// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update');
  
//   whyDidYouUpdate(React, { include: /^Shopping/, });
// }

const appContainer = document.getElementById('root');

ReactDOM.render(
  <ShoppingList />,
  appContainer,
);