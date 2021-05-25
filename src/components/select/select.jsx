import React, {Fragment, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import Icon from "../icon/icon";
import {IconType, CreditPurpose} from "../../const";

const Select = ({creditPurpose, defaultValue, onChangeSelect}) => {

  const [isSelectOpened, setSelectOpened] = useState(false);

  const handleSelectClick = useCallback(
    (evt) => {
        evt.preventDefault();
        setSelectOpened(!isSelectOpened);
    }, [isSelectOpened]
  );

  const handleSelectBlur = useCallback(
    (evt) => {
        evt.preventDefault();
        setSelectOpened(false);
    }, []
  );

  const handleSelectChange = useCallback(
    (evt) => {
        evt.preventDefault();
        onChangeSelect(evt.target.id);
        setSelectOpened(false);
    }, [onChangeSelect]
  );

  const selectedValue = creditPurpose ? CreditPurpose[creditPurpose.toUpperCase()].name : defaultValue;

  return (
      <Fragment>
        <button className={`form__input form__input--select ${isSelectOpened ? `form__input--opened` : ``}`} onClick={handleSelectClick} onBlur={handleSelectBlur}>
         {selectedValue}
         <Icon icon={IconType.SELECT} />
       </button>
       {isSelectOpened && <ul className="form__option-list">
        {Object.keys(CreditPurpose).map((purpose, i) => (
          <li key={i + 1} id={CreditPurpose[purpose].type} className="form__input form__input--option"
            onMouseDown={(evt) => evt.preventDefault()} onClick={handleSelectChange}>
            {CreditPurpose[purpose].name}
          </li>
          ))}
       </ul>
      }
      </Fragment>
  );
};

Select.propTypes = {
  creditPurpose: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]).isRequired,
  defaultValue: PropTypes.string.isRequired,
  onChangeSelect: PropTypes.func.isRequired,
}

export default Select;
