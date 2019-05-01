import React, { Component } from 'react';
import axios from 'axios';
import Module1 from './module1';
import Module2 from './module2';
import Movies from './movies';

class Modules extends Component {
  state = {
    module1: { name: 'John Doe', age: 20, place: 'Boston' },
    module2: [
      {
        url: 'https://picsum.photos/200',
        name: 'John',
        ocupation: 'Musician',
      },
      {
        url: 'https://picsum.photos/200',
        name: 'Paul',
        ocupation: 'Musician',
      },
      {
        url: 'https://picsum.photos/200',
        name: 'Ringo',
        ocupation: 'Musician',
      },
      {
        url: 'https://picsum.photos/200',
        name: 'George',
        ocupation: 'Musician',
      },
      {
        url: 'https://picsum.photos/200',
        name: 'Eric',
        ocupation: 'Musician',
      },
      {
        url: 'https://picsum.photos/200',
        name: 'BB',
        ocupation: 'Musician',
      },
    ],
  };

  render() {
    const { module1 } = this.state;
    const { module2 } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1>Modules</h1>
          </div>
          {/* This {..something} syntax means the whole object is being passed */}

          <div className="col-lg-12">
            <Module1 {...module1} />
          </div>

          {module2.map(e => (
            <Module2 {...e} />
          ))}
        </div>

        <div className="row">
          <div className="col-lg-12">
            <Movies />
          </div>
        </div>
      </div>
    );
  }
}

export default Modules;
