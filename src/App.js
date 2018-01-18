import React, { Component } from 'react';
import { debounce, vibrate } from './utils';
import { subscribeToTimer, subscribeToRoom, subscribeToPositionUpdates, setPosition } from './api';
import Draggable from 'react-draggable';
import iconSVG from "./print.svg"

class App extends Component {

  state = {
    name: ('David' + Math.random()).substring(0, 5),
    timestamp: 'no timestamp yet',
    dots: [],
    pos: {
      x: 0,
      y: 0
    }
  };
}

export default App;
