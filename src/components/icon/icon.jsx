import React from 'react';
import PropTypes from "prop-types";

const Icon = ({icon}) => {

  return(
    <svg className={`icon icon--${icon.name}`} width={icon.width} height={icon.height}>
      <use xlinkHref={`svg/sprite.svg#icon-${icon.name}`} />
    </svg>
  )
}

Icon.propTypes = {
  icon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};

export default Icon;
