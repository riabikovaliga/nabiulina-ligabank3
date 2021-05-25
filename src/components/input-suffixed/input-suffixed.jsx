import React from 'react';
import PropTypes from 'prop-types';
import Error from "../error/error";
import {getInputSize, declineNumeral} from "../../utils";

const MIN_INPUT_WIDTH = 25;

const InputSuffixed = ({name, suffix, stringValue, value, isError, isErrorMessage, isControls, onChangeInput, onBlurInput, onClickControl}) => {
    return (
      <div className={`form__input form__input--wrapper ${isError ? `form__input--error` : ``}`} tabIndex="0" >
        {isControls && <button id="decrease" className="form__сontrol form__сontrol--decrease" type="button" aria-label="Уменьшить" onClick={onClickControl} />}

        <input className="form__input form__input--suffixed" type="text" id={name} name={name}
          value={stringValue} style={{width: `${stringValue ? getInputSize(stringValue, value) : MIN_INPUT_WIDTH}px`}} maxLength="10"
          onChange={onChangeInput} onBlur={onBlurInput} />
        <span className="form__suffix">{declineNumeral(value, ...suffix)}</span>

        {isControls && <button id="increase" className="form__сontrol form__сontrol--increase" type="button" aria-label="Увеличить" onClick={onClickControl} />}

        {isErrorMessage && <Error />}
      </div>
    );
}

InputSuffixed.propTypes = {
  name: PropTypes.string.isRequired,
  suffix: PropTypes.arrayOf(PropTypes.string).isRequired,
  stringValue: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  isError: PropTypes.bool.isRequired,
  isErrorMessage: PropTypes.bool,
  isControls: PropTypes.bool,
  onChangeInput: PropTypes.func.isRequired,
  onBlurInput: PropTypes.func.isRequired,
  onClickControl: PropTypes.func,
}

export default InputSuffixed;
