import '../scss/index';

import React from 'react';
import ReactDOM from 'react-dom';

import Gift from './App';

const element = document.getElementById('content');
ReactDOM.render(<Gift />, element);

document.body.classList.remove('loading');