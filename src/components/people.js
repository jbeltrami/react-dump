import React, { Component } from 'react';
import Axios from 'axios';
import Person from './person';
import PeopleAgeFilter from './peopleAgeFilter';
import PeopleGenderFilter from './peopleGenderFilter';
import PeoplePagination from './peoplePagination';

/*

  Re-factor this component with the following:

  state = {
    people: [],
    currentPage: 1,
    pplPerPage: 6,
    job: ['leadership'],
    location: ['Miami'],
    service: ['OCIO'],
    pplToRender[<substet of this.state.people>]
  }

  // Filter Function:
  const { job, location, service } = this.state

  applyFilter = (people, job, location, service) => {
    const filtered = people
                      .filter(e => e.job === job) // add if statement to verify if 'job' is not empty
                      .filter(e => e.location === location) // add if statement to verify if 'location' is not empty
                      .filter(e => e.service === service) // add if statement to verify if 'service' is not empty

    this.setState(() => {
      pplToRender: [...filtered]
    })
  }

  // Render Component based on pplToRender
  {pplToRender.map((person, index) => (
              <Person {...person} key={index} onDelete={this.handleDelete} />
            ))}

*/

class People extends Component {
  state = {
    people: [],
    ages: [20, 40, 60, 70],
    genders: ['female', 'male'],
    currentPage: 1,
    pplPerPage: 6,
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
      currentPage: 1,
    });
  };

  handleGenderFilter = gender => {
    const { people } = this.state;
    const filteredPeople = people.filter(e => e.gender === gender);

    this.setState({
      people: [...filteredPeople],
      currentPage: 1,
    });
  };

  handleDelete = id => {
    const { people } = this.state;
    const filteredPeople = people.filter(e => e.id.value !== id);

    this.setState({
      people: [...filteredPeople],
    });
  };

  handlePagination = page => {
    this.setState({
      currentPage: Number(page),
    });
  };

  render() {
    const { people, ages, genders, currentPage, pplPerPage } = this.state;

    const indexOfLastPerson = currentPage * pplPerPage;
    const indexOfFirstPerson = indexOfLastPerson - pplPerPage;
    const currentPeople = people.slice(indexOfFirstPerson, indexOfLastPerson);

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>People will go here</h1>
              <h3>based on: https://randomuser.me/documentation </h3>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-12">People Age Filter:</div>
          </div>

          <PeopleAgeFilter ages={ages} onFilter={this.handleAgeFilter} />

          <div className="row mt-4">
            <div className="col-lg-12">People Gender Filter:</div>
          </div>
          <PeopleGenderFilter
            genders={genders}
            onFilter={this.handleGenderFilter}
          />

          <div className="row align-item-center justify-content-center mt-4">
            {currentPeople.map((person, index) => (
              <Person {...person} key={index} onDelete={this.handleDelete} />
            ))}
          </div>

          <PeoplePagination
            people={people}
            pplPerPage={pplPerPage}
            onPaginate={this.handlePagination}
          />
        </div>
      </div>
    );
  }
}

export default People;
