import React from 'react';
import PropTypes from 'prop-types';

const FormFieldset = ({name, legend, children}) => {

  return (
    <fieldset className={`form__fieldset form__fieldset--${name}`}>
      <legend className="visually-hidden">{legend}</legend>
      {children}
    </fieldset>
  );
};

FormFieldset.propTypes = {
  name: PropTypes.string.isRequired,
  legend: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
}

export default FormFieldset;
