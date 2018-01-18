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

  handleDrag(e) {
    let x = ((e.clientX - e.offsetX) / window.innerWidth * 100);
    let y = ((e.clientY - e.offsetY) / window.innerHeight * 100);

    this.state.dots.map((dot, i) => {
      let distance = this.getDistance(
        document.getElementById(dot.id),
        e.target
      );

      if (distance <= 50) {
        console.log('e');
        vibrate([100, 20]);
      }
    });

    setPosition({
      x: x,
      y: y
    });
  }

  getDistance(a, b) {
  console.log(b);
    let aPosition = this.getPositionAtCenter(a);
    let bPosition = this.getPositionAtCenter(b);

    return Math.sqrt(
      Math.pow(aPosition.x - bPosition.x, 2) +
      Math.pow(aPosition.y - bPosition.y, 2)
    );
  }

  getPositionAtCenter(element) {
    let data = element.getBoundingClientRect();

    return {
      x: data.left + data.width / 2,
      y: data.top + data.height / 2
    };
  };
}

export default App;
