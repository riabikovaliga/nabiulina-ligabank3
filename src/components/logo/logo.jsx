import React from 'react';
import PropTypes from "prop-types";

const Logo = ({name, type}) => {

  return (
    <div className={`${name}__logo`}>
      {/* eslint-disable-next-line */}
      <a href="#">
        <img src={type ? `svg/${type}_logo.svg` : `svg/logo.svg`} width="150" height="27" alt="Логотип Лига Банка"/>
      </a>
    </div>
  );
};

Logo.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string
};

export default Logo;
