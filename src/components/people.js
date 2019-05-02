import React, { Component } from 'react';
import Axios from 'axios';
import Person from './person';
import PeopleAgeFilter from './people-filter';

class People extends Component {
  state = {
    people: [],
    ages: [20, 40, 60, 70],
  };

  componentDidMount() {
    this.getAllPeople();
  }

  getAllPeople = () => {
    Axios.get('https://randomuser.me/api/?results=50')
      .then(res => {
        const apiResponse = res.data.results;

        return apiResponse.sort((a, b) => a.name.last - b.name.last);
      })
      .then(res => {
        this.setState(() => ({
          people: [...res],
        }));
      });
  };

  handleAgeFilter = age => {
    const { people } = this.state;
    const filteredPeople = people.filter(e => e.dob.age > age);

    this.setState({
      people: [...filteredPeople],
    });
  };

  handleDelete = id => {
    const { people } = this.state;
    const filteredPeople = people.filter(e => e.id.value !== id);

    this.setState({
      people: [...filteredPeople],
    });
  };

  render() {
    const { people, ages } = this.state;

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>People will go here</h1>
              <h3>based on: https://randomuser.me/documentation </h3>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">People Age Filter:</div>
          </div>

          <PeopleAgeFilter ages={ages} onFilter={this.handleAgeFilter} />

          <div className="row align-item-center justify-content-center">
            {people.map((person, index) => (
              <Person {...person} key={index} onDelete={this.handleDelete} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default People;
