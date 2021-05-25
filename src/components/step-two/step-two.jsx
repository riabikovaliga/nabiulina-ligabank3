import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import CalculatorStep from "../calculator-step/calculator-step";
import FormFieldset from "../form-fieldset/form-fieldset";
import PropertyField from "../property-field/property-field";
import InitialField from "../initial-field/initial-field";
import TermField from "../term-field/term-field";
import Checkbox from "../checkbox/checkbox";
import {setPropertyValue, setInitialFee, setCreditTerm, setCheckboxValue} from "../../store/slice";
import {CalculatorStage, CalculatorFormField} from "../../const";
import {getInitialFee} from "../../utils";

const {PROPERTY, INITIAL_FEE, CREDIT_TERM, CHECKBOX} = CalculatorFormField;

const StepTwo = ({
    creditPurpose,
    propertyValue,
    initialFee,
    creditTerm,
    checkboxValues,
    changePropertyValue,
    changeInitialFee,
    changeCreditTerm,
    changeCheckboxValue
  }) => {

  const initialFeePercent = INITIAL_FEE.percent[creditPurpose];

  useEffect(() => {
    if (propertyValue === -1) {
      changePropertyValue(PROPERTY.min[creditPurpose])
    }

    if (initialFee === -1) {
      changeInitialFee(getInitialFee(PROPERTY.min[creditPurpose], initialFeePercent));
    }

    if (creditTerm === -1) {
      changeCreditTerm(CREDIT_TERM.min[creditPurpose])
    }
  });

  return (
    <Fragment>
      <CalculatorStep name={CalculatorStage.TWO.name} title={CalculatorStage.TWO.title}>

        <FormFieldset name={PROPERTY.name} legend={PROPERTY.legend}>
          <PropertyField purpose={creditPurpose} name={PROPERTY.name} label={PROPERTY.label[creditPurpose]} suffix={PROPERTY.suffix}
            minValue={PROPERTY.min[creditPurpose]} maxValue={PROPERTY.max[creditPurpose]} value={propertyValue}
            setValue={changePropertyValue} setInitialFeeValue={changeInitialFee} initialFeePercent={initialFeePercent} />
        </FormFieldset>

        <FormFieldset name={INITIAL_FEE.name} legend={INITIAL_FEE.legend}>
          <InitialField name={INITIAL_FEE.name} label={INITIAL_FEE.label} suffix={INITIAL_FEE.suffix}
            minValue={getInitialFee(propertyValue, initialFeePercent)} maxValue={propertyValue}
            value={initialFee} setValue={changeInitialFee} initialFeePercent={initialFeePercent} />
        </FormFieldset>

        <FormFieldset name={CREDIT_TERM.name} legend={CREDIT_TERM.legend}>
          <TermField name={CREDIT_TERM.name} label={CREDIT_TERM.label} suffix={CREDIT_TERM.suffix}
            minValue={CREDIT_TERM.min[creditPurpose]} maxValue={CREDIT_TERM.max[creditPurpose]}
            value={creditTerm} setValue={changeCreditTerm} />
        </FormFieldset>

        {CHECKBOX[creditPurpose].map((field, index) => {
          return <FormFieldset key={index + 1} name={field.name} legend={field.legend}>
              <Checkbox name={field.name} label={field.label} setValue={changeCheckboxValue} value={checkboxValues[field.name]} />
          </FormFieldset>
          })}

      </CalculatorStep>
    </Fragment>
  );
};

StepTwo.propTypes = {
  creditPurpose: PropTypes.string.isRequired,
  propertyValue: PropTypes.number.isRequired,
  initialFee: PropTypes.number.isRequired,
  creditTerm: PropTypes.number.isRequired,
  checkboxValues: PropTypes.shape({
    maternal: PropTypes.bool,
    comprehensive: PropTypes.bool,
    insurance: PropTypes.bool,
  }).isRequired,
  changePropertyValue: PropTypes.func.isRequired,
  changeInitialFee: PropTypes.func.isRequired,
  changeCreditTerm: PropTypes.func.isRequired,
  changeCheckboxValue: PropTypes.func.isRequired,
}

const mapStateToProps = (store) => ({
  propertyValue: store.creditData.propertyValue,
  initialFee: store.creditData.initialFee,
  creditTerm: store.creditData.creditTerm,
  checkboxValues: {
    maternal: store.creditData.maternal,
    comprehensive: store.creditData.comprehensive,
    insurance: store.creditData.insurance,
  }
});

const mapDispatchToProps = (dispatch) => ({
  changePropertyValue(data) {
    dispatch(setPropertyValue(data));
  },
  changeInitialFee(data) {
    dispatch(setInitialFee(data));
  },
  changeCreditTerm(data) {
    dispatch(setCreditTerm(data));
  },
  changeCheckboxValue(data) {
    dispatch(setCheckboxValue(data));
  },
});

export {StepTwo};
export default connect(mapStateToProps, mapDispatchToProps)(StepTwo);
