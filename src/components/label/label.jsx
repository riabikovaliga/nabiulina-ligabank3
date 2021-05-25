import React from 'react';
import PropTypes from 'prop-types';

const Label = ({name, label, isLabelVisible}) => {

  return (
      <label className={isLabelVisible ? `form__label` : `visually-hidden`} htmlFor={name}>{label}</label>
  );
};

Label.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isLabelVisible: PropTypes.bool,
};

export default Label;
