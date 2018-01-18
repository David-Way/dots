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

  constructor(props) {
    super(props);

    subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));

    subscribeToRoom(this.state.name, (err, occupants) => {
      this.setState({
        occupants
      });

      setPosition({
        x: this.state.pos.x,
        y: this.state.pos.y
      });
    });

    setPosition({
      x: 0,
      y: 0
    });

    subscribeToPositionUpdates((err, dot) => {
      if (true) { // update it
        let newDots = [];
        newDots.push(dot)
        this.setState({ dots: newDots })
      } else { // add it
        this.setState({
          dots: this.state.dots.concat([dot])
        });
      }
    });

    this.handleDrag = debounce(this.handleDrag, 10);
  }
}

export default App;
