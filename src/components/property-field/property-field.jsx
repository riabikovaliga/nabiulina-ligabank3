import React, {Fragment, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import Label from '../label/label';
import InputSuffixed from "../input-suffixed/input-suffixed";
import {parseNumberToString, formatString, isNumbersOnly, getInitialFee} from "../../utils";
import {InputControl} from "../../const";

const PropertyField = ({purpose, name, label, suffix, minValue, maxValue, value, setValue, setInitialFeeValue, initialFeePercent}) => {

  const stringValue = parseNumberToString(value);
  const minStringValue = parseNumberToString(minValue);
  const maxStringValue = parseNumberToString(maxValue);
  const step = InputControl.STEP[purpose];

  const [isError, setError] = useState(false);

  const handleInputChange = useCallback(
    (evt) => {
      const newPropertyValue = formatString(evt.target.value);

      if (!isNumbersOnly(newPropertyValue)) {
        setError(true);
        return;
      }

      const numberPropertyValue = Number(newPropertyValue);

      if (numberPropertyValue < minValue || numberPropertyValue > maxValue) {
        setError(true);
        setValue(numberPropertyValue);
        return;
      }

      if (isError) {
        setError(false);
      }

      setValue(numberPropertyValue);
      setInitialFeeValue(getInitialFee(numberPropertyValue, initialFeePercent));

    }, [minValue, maxValue, isError, setValue, setInitialFeeValue, initialFeePercent]
  );

  const handleInputBlur = useCallback(
    () => {
      if (isError) {
        setError(false);
      }

      if (value < minValue) {
        setValue(minValue);
        return;
      }

      if (value > maxValue) {
        setValue(maxValue);
        return;
      }

      return;

    }, [minValue, maxValue, value, isError, setValue]
  );

  const handleControlClick = useCallback(
    (evt) => {
      evt.preventDefault();

      switch (evt.target.id) {
        case InputControl.DECREASE:
          const decreasedValue = value - step;

          if (decreasedValue < minValue) {
            return;
          }

          setValue(decreasedValue);
          setInitialFeeValue(getInitialFee(decreasedValue, initialFeePercent))
          break;
        case InputControl.INCREASE:
          const increasedValue = value + step;

          if (increasedValue > maxValue) {
            return;
          }

          setValue(increasedValue);
          setInitialFeeValue(getInitialFee(increasedValue, initialFeePercent))
          break;
        default:
          return;
      }

    }, [value, step, minValue, setValue, setInitialFeeValue, initialFeePercent, maxValue]
  );

  return (
    <Fragment>
      <Label name={name} label={label} isLabelVisible={true} />
      <InputSuffixed name={name} suffix={suffix} stringValue={stringValue} value={value}
        isError={isError} isErrorMessage={isError} isControls={true} onChangeInput={handleInputChange}
        onBlurInput={handleInputBlur} onClickControl={handleControlClick} />
      <span className="form__sublabel">{`От ${minStringValue} до ${maxStringValue} рублей`}</span>
    </Fragment>
    );
}

PropertyField.propTypes = {
  purpose: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  suffix: PropTypes.arrayOf(PropTypes.string).isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  initialFeePercent: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  setInitialFeeValue: PropTypes.func.isRequired,
}

export default PropertyField;
