import React, { Component } from 'react';
import Axios from 'axios';
import Person from './person';
// import PeopleAgeFilter from './peopleAgeFilter';
// import PeopleGenderFilter from './peopleGenderFilter';
import PeoplePagination from './peoplePagination';
import LocationFilter from './locationFilter';

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
    currentPage: 1,
    pplPerPage: 6,
    // division: ['All'],
    locations: [],
    // service: ['All'],
    pplToRender: [],
  };

  componentDidMount() {
    this.getAllPeople();
  }

  // Function to fetch all data, when component mounts
  getAllPeople = () => {
    Axios.get('http://localhost/mig/wp-json/wp/v2/people?_embed')
      .then(res => {
        const apiResponse = res.data;

        async function reArrangePeople() {
          let leaders = [];
          let nonLeaders = [];

          leaders = await apiResponse
            .filter(e => e.acf.division === 'Leadership')
            .sort((a, b) =>
              a.title.rendered
                .toLowerCase()
                .split(' ')
                .pop()
                .localeCompare(
                  b.title.rendered
                    .toLowerCase()
                    .split(' ')
                    .pop()
                )
            );

          nonLeaders = await apiResponse
            .filter(e => e.acf.division !== 'Leadership')
            .sort((a, b) =>
              a.title.rendered
                .toLowerCase()
                .split(' ')
                .pop()
                .localeCompare(
                  b.title.rendered
                    .toLowerCase()
                    .split(' ')
                    .pop()
                )
            );

          const sortedResponse = await leaders.concat(nonLeaders);

          return sortedResponse;
        }

        return reArrangePeople();
      })
      .then(res => {
        this.setState(() => ({
          people: [...res],
          pplToRender: [...res],
          locations: [
            ...res
              .map(e => e.acf.location)
              .filter(function(x, i, a) {
                return a.indexOf(x) === i;
              }),
          ],
        }));
      });
  };

  // Handlers for events inside components. These will then change the state of the application and re-render the DOM.

  handleLocationFilter = location => {
    const { people } = this.state;
    let filteredPeople;

    if (location !== 'All') {
      filteredPeople = people.filter(e => e.acf.location === location);
      this.setState({
        pplToRender: [...filteredPeople],
        currentPage: 1,
      });
    } else {
      this.setState({
        pplToRender: [...people],
      });
    }
  };

  handlePagination = page => {
    this.setState({
      currentPage: Number(page),
    });
  };

  // Render method, output mark-up based on state.
  render() {
    const { currentPage, pplPerPage, pplToRender, locations } = this.state;

    const indexOfLastPerson = currentPage * pplPerPage;
    const indexOfFirstPerson = indexOfLastPerson - pplPerPage;
    const currentPeople = pplToRender.slice(
      indexOfFirstPerson,
      indexOfLastPerson
    );

    return (
      <div className="rps container-spacer">
        <div className="container">
          <LocationFilter
            locations={locations}
            onFilterLocation={this.handleLocationFilter}
          />

          <div className="row no-gutters rps__card-row">
            {currentPeople.map((person, index) => (
              <Person {...person} key={index} />
            ))}
          </div>

          <PeoplePagination
            people={pplToRender}
            pplPerPage={pplPerPage}
            onPaginate={this.handlePagination}
          />
        </div>
      </div>
    );
  }
}

export default People;
