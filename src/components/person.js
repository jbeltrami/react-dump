import React from 'react';
import PropTypes from 'prop-types';

export default function Person(props) {
  const { acf, title, link } = props;

  return (
    <div className="col-lg-4 col-md-6">
      <div className="rps__card h-100">
        <figure className="rps__card-figure rps__leader">
          <img
            src={acf.portrait.url}
            className="rps__card-img"
            alt={acf.portrait.alt}
          />

          {acf.division === 'Leadership' ? (
            <figcaption>
              <h5>Leadership</h5>
            </figcaption>
          ) : (
            ''
          )}
        </figure>
        <div className="rps__card-wrapper">
          <h4 className="rps__card-name">
            <a href={link}>{title.rendered}</a>
          </h4>
          <p className="rps__card-title">{acf.job_title}</p>
          <p className="rps__card-location">{acf.location}</p>
        </div>
      </div>
    </div>
  );
}

Person.propTypes = {
  acf: PropTypes.object,
  title: PropTypes.object,
  link: PropTypes.string,
};
