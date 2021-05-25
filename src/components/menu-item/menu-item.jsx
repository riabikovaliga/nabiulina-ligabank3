import React from 'react';
import PropTypes from "prop-types";

const MenuItem = ({type, title}) => {

    return (
      <li className={`${type}__item`}>
        {/* eslint-disable-next-line */}
        <a className={`${type}__link`} href="#">{title}</a>
      </li>
    )
}

MenuItem.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MenuItem;
