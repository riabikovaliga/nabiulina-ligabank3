import React from 'react';
import PropTypes from 'prop-types';

const Input = ({name, type, value, placeholder, isError, onChangeInput}) => {

  return (
    <input className={`form__input ${isError ? `form__input--error` : ``}`} type={type} id={name} name={name} value={value}
      onChange={onChangeInput} placeholder={placeholder ? placeholder : ``} />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isError: PropTypes.bool,
  onChangeInput: PropTypes.func.isRequired,
};

export default Input;
