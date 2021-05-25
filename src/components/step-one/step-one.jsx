import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import CalculatorStep from "../calculator-step/calculator-step";
import FormFieldset from "../form-fieldset/form-fieldset";
import Select from "../select/select";
import {CalculatorStage, CalculatorFormField} from "../../const";

const {SELECT} = CalculatorFormField;

const StepOne = ({creditPurpose, onChangePurpose}) => {

  return (
    <Fragment>
      <CalculatorStep name={CalculatorStage.ONE.name} title={CalculatorStage.ONE.title}>
        <FormFieldset name={SELECT.name} legend={SELECT.legend}>
          <Select creditPurpose={creditPurpose} defaultValue={SELECT.defaultValue} onChangeSelect={onChangePurpose} />
        </FormFieldset>
      </CalculatorStep>
    </Fragment>
  );
};

StepOne.propTypes = {
  creditPurpose: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]).isRequired,
  onChangePurpose: PropTypes.func.isRequired,
};

export default StepOne;
