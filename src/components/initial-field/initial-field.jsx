import React, {Fragment, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import Label from "../label/label";
import InputSuffixed from "../input-suffixed/input-suffixed";
import Range from "../range/range";
import {parseNumberToString, formatString, isNumbersOnly, getInitialFee} from "../../utils";

const STEP = 0.05;

const InitialField = ({name, label, suffix, minValue, maxValue, value, initialFeePercent, setValue}) => {

  const [isError, setError] = useState(false);
  const [badInitialFee, setBadInitialFee] = useState(false);

  let actualValue;

  if (badInitialFee) {
    actualValue = value;
  } else {
    actualValue = value < minValue ? minValue : value > maxValue ? getInitialFee(maxValue, initialFeePercent) : value;
  }

  const stringValue = parseNumberToString(actualValue);

  const rangeStep = Math.round(maxValue * STEP);
  const percentage = maxValue ? Math.round(actualValue / maxValue * 100) : 0;

  const handleInputChange = useCallback(
    (evt) => {
      const newInitialFee = formatString(evt.target.value);

      if (!isNumbersOnly(newInitialFee)) {
        setError(true);
        return;
      }

      const numberInitialFee = Number(newInitialFee);

      if (numberInitialFee < minValue) {
        setError(true);
        setBadInitialFee(`less`);
        setValue(numberInitialFee);
        return;
      }

      if (numberInitialFee > maxValue) {
        setError(true);
        setBadInitialFee(`more`);
        setValue(numberInitialFee);
        return;
      }

      if (isError) {
        setError(false);
      }

      if (badInitialFee) {
        setBadInitialFee(false);
      }

      setValue(numberInitialFee);

    }, [isError, badInitialFee, setValue, minValue, maxValue]
  );

  const handleInputBlur = useCallback(
    () => {
      if (isError) {
        setError(false);
      }

      if (badInitialFee) {
        setBadInitialFee(false);
      }

      if (actualValue < minValue) {
        setValue(minValue);
        return;
      }

      if (actualValue > maxValue) {
        setValue(getInitialFee(maxValue, initialFeePercent));
        return;
      }

      return;

    }, [isError, badInitialFee, actualValue, minValue, maxValue, setValue, initialFeePercent]
  );

  const handleRangeChange = useCallback(
    (evt) => {
      setValue(Number(evt.target.value));
    }, [setValue]
  );

  return (
    <Fragment>
      <Label name={name} label={label} isLabelVisible={true} />
      <InputSuffixed name={name} suffix={suffix} stringValue={stringValue} value={actualValue}
      isError={isError} onChangeInput={handleInputChange} onBlurInput={handleInputBlur} />
      <Range minValue={minValue} maxValue={maxValue} currentValue={actualValue} 
      step={rangeStep} onChangeRange={handleRangeChange} />
      <div className="form__range-label">
        <span>{badInitialFee === `less` ? `< ` : badInitialFee === `more` ? `> ` : ``}{percentage}%</span>
      </div>
    </Fragment>
  );
}

InitialField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  suffix: PropTypes.arrayOf(PropTypes.string).isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  initialFeePercent: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
}

export default InitialField;
