import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 4 },
      { id: 3, value: 3 },
      { id: 4, value: 0 },
    ],
  };

  handleDelete = counterId => {
    const { counters } = this.state;
    const filteredCounters = counters.filter(c => c.id !== counterId);

    this.setState({ counters: filteredCounters });
  };

  render() {
    const { counters } = this.state;
    return (
      <div>
        <ul>
          {counters.map(counter => (
            <Counter
              key={counter.id}
              value={counter.value}
              id={counter.id}
              onDelete={this.handleDelete}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Counters;
