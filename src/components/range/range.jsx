import React from 'react';
import PropTypes from 'prop-types';

const Range = ({minValue, maxValue, currentValue, step, onChangeRange}) => {

  return (
    <input type="range" min={minValue} max={maxValue} value={currentValue} step={step} className="form__range"
      onChange={onChangeRange} />
  );
}

Range.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  currentValue: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  onChangeRange: PropTypes.func.isRequired,
}

export default Range;
