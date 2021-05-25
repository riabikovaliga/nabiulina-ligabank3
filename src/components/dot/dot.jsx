import React from 'react';
import PropTypes from "prop-types";

const Dot = ({isActive, isLight}) => {

    return (
      <span className={`dots__item ${isActive ? isLight ? `dots__item--active-light` : `dots__item--active` : ``}`} />
    )
}

Dot.propTypes = {
  isActive: PropTypes.bool,
  isLight: PropTypes.bool,
};

export default Dot;
