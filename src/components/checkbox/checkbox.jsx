import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import Icon from "../icon/icon";
import {IconType} from "../../const";

const Checkbox = ({name, label, value, setValue}) => {

  const handleCheckboxChange = useCallback(
    (evt) => {
      setValue({name: evt.target.id, value :evt.target.checked ? true : false})
    }, [setValue]
  );

  return (
    <div className="form__checkbox">
      <input type="checkbox" className="form__checkbox-input visually-hidden" id={name} name={name} 
        onChange={handleCheckboxChange} checked={value} />
      <label className="form__label form__label--checkbox" htmlFor={name}>
        {label}
        <Icon icon={IconType.CHECKBOX} />
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
}

export default Checkbox;
