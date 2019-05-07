import React, { Component } from 'react';
import Axios from 'axios';
import Person from './person';
import PeoplePagination from './peoplePagination';
import LocationFilter from './locationFilter';
import DivisionFilter from './divisionFilter';

class People extends Component {
  state = {
    people: [],
    currentPage: 1,
    pplPerPage: 6,
    divisions: [],
    locations: [],
    // services: [],
    pplToRender: [],
    filters: {
      division: [],
      location: [],
      service: [],
    },
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
          divisions: [
            ...res
              .map(e => e.acf.division)
              .filter(function(x, i, a) {
                return a.indexOf(x) === i;
              }),
          ],
        }));
      });
  };

  // applyFilters is a callback for the setState method called with the filter handlers.
  applyFilters = () => {
    const { people, filters } = this.state;

    const handleLocation = arg => {
      const filteredLocation =
        arg.length !== 0
          ? people.filter(e => e.acf.location === filters.location)
          : people;

      return filteredLocation;
    };

    const handleDivision = (array, arg) => {
      const filteredDivision =
        arg.length !== 0
          ? array.filter(e => e.acf.division === filters.division)
          : array;

      return filteredDivision;
    };

    const applyAllFilters = async function() {
      const filteredLocation = await handleLocation(filters.location);
      const filteredDivision = await handleDivision(
        filteredLocation,
        filters.division
      );

      return filteredDivision;
    };

    applyAllFilters().then(res =>
      this.setState({
        pplToRender: [...res],
      })
    );
  };

  // Handlers for events inside components. These will then change the state of the application and re-render the DOM.
  handleLocationFilter = location => {
    const { filters } = this.state;

    if (location !== 'All') {
      this.setState(
        {
          currentPage: 1,
          filters: { ...filters, location },
        },
        // The second parameter of setState is a function to run after setState is applied
        () => {
          this.applyFilters();
        }
      );
    } else {
      this.setState(
        {
          filters: { ...filters, location: [] },
        },
        () => {
          this.applyFilters();
        }
      );
    }
  };

  handleDivisionFilter = division => {
    const { filters } = this.state;
    if (division !== 'All') {
      this.setState(
        {
          currentPage: 1,
          filters: { ...filters, division },
        },
        () => {
          this.applyFilters();
        }
      );
    } else {
      this.setState(
        {
          filters: { ...filters, division: [] },
        },
        () => {
          this.applyFilters();
        }
      );
    }
  };

  handlePagination = page => {
    this.setState({
      currentPage: Number(page),
    });
  };

  // Render method, output mark-up based on state.
  render() {
    const {
      currentPage,
      pplPerPage,
      pplToRender,
      locations,
      divisions,
    } = this.state;

    const indexOfLastPerson = currentPage * pplPerPage;
    const indexOfFirstPerson = indexOfLastPerson - pplPerPage;
    const currentPeople = pplToRender.slice(
      indexOfFirstPerson,
      indexOfLastPerson
    );

    return (
      <div className="rps container-spacer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <LocationFilter
                locations={locations}
                onFilterLocation={this.handleLocationFilter}
              />
            </div>

            <div className="col-lg-4">
              <DivisionFilter
                divisions={divisions}
                onFilterDivision={this.handleDivisionFilter}
              />
            </div>
          </div>

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
