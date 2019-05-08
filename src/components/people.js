import React, { Component } from 'react';
import Axios from 'axios';
import Person from './person';
import PeoplePagination from './peoplePagination';
import Filters from './filters';

class People extends Component {
  state = {
    people: [],
    currentPage: 1,
    pplPerPage: 6,
    divisions: [],
    locations: [],
    services: [],
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
        const allServices = [];

        res
          .map(e => e.acf.accordions.service_areas)
          .forEach(el => {
            el.forEach(e => allServices.push(e.areas));
          });

        const singleServices = allServices.filter(function(x, i, a) {
          return a.indexOf(x) === i;
        });

        // Set states for DOM rendering
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
          services: [...singleServices],
        }));
      });
  };

  // applyFilters is a callback for the setState method called with the filter handlers.
  applyFilters = () => {
    const { people, filters } = this.state;

    const handleLocation = arg => {
      const filteredLocation =
        arg.length !== 0 ? people.filter(e => e.acf.location === arg) : people;

      return filteredLocation;
    };

    const handleDivision = (array, arg) => {
      const filteredDivision =
        arg.length !== 0 ? array.filter(e => e.acf.division === arg) : array;

      return filteredDivision;
    };

    const handleService = (array, arg) => {
      const filteredElements = [];
      array.forEach(e =>
        e.acf.accordions.service_areas.forEach(el => {
          if (arg.length && el.areas === arg) {
            filteredElements.push(e);
          }
        })
      );

      const singleServices = filteredElements.filter(function(x, i, a) {
        return a.indexOf(x) === i;
      });

      const filteredService = arg.length !== 0 ? singleServices : array;

      return filteredService;
    };

    const applyAllFilters = async function() {
      const filteredLocation = await handleLocation(filters.location);
      const filteredDivision = await handleDivision(
        filteredLocation,
        filters.division
      );
      const paramToRender = await handleService(
        filteredDivision,
        filters.service
      );

      return paramToRender;
    };

    applyAllFilters().then(res => {
      this.setState({
        pplToRender: [...res],
      });
    });
  };

  // Handlers for events inside components. These will then change the state of the application and re-render the DOM.
  handleFilter = (arg, type) => {
    const { filters } = this.state;

    if (arg !== 'All') {
      this.setState(
        {
          currentPage: 1,
          filters: { ...filters, [type]: arg },
        },
        // The second parameter of setState is a callback to run after setState is applied
        () => {
          this.applyFilters();
        }
      );
    } else {
      this.setState(
        {
          filters: { ...filters, [type]: [] },
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
      services,
      filters,
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
              <Filters
                filterType="location"
                filters={filters}
                filterParams={locations}
                onFilterLocation={this.handleFilter}
              />
            </div>

            <div className="col-lg-4">
              <Filters
                filterType="division"
                filters={filters}
                filterParams={divisions}
                onFilterLocation={this.handleFilter}
              />
            </div>

            <div className="col-lg-4">
              <Filters
                filterType="service"
                filters={filters}
                filterParams={services}
                onFilterLocation={this.handleFilter}
              />
            </div>
          </div>

          <div className="row no-gutters rps__card-row">
            {currentPeople.length ? (
              currentPeople.map((person, index) => (
                <Person {...person} key={index} />
              ))
            ) : (
              <div className="col-lg-12">
                <h1>Sorry,</h1>
                <h4>no search results match your criteria</h4>
              </div>
            )}
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
