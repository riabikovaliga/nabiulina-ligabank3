import React from 'react';
import PropTypes from 'prop-types';
import InputMask from "react-input-mask";

const InputMasked = ({mask, name, type, value, placeholder, isError, onChangeInput}) => {

  return (
    <InputMask mask={mask} value={value} onChange={onChangeInput}>
      <input className={`form__input ${isError ? `form__input--error` : ``}`} type={type} id={name} name={name}
        pattern="\+7\s?[\(]{0,1}[0-9]{3}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}" placeholder={placeholder ? placeholder : ``} />
    </InputMask>
  );
};

InputMasked.propTypes = {
  mask: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isError: PropTypes.bool,
  onChangeInput: PropTypes.func.isRequired,
};

export default InputMasked;
