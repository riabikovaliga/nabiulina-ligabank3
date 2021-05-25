import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import StepOne from "../step-one/step-one";
import StepTwo from "../step-two/step-two";
import StepThree from "../step-three/step-three";
import Offer from "../offer/offer";
import {saveApplication, clearClientData, clearCreditData} from "../../store/slice";
import {CreditPurpose, ModalType} from "../../const";

const Calculator = ({
    propertyValue,
    initialFee,
    creditTerm,
    isMaternalCapital,
    isComprehensive,
    isInsurance,
    saveNewApplication,
    clearCalculatorForm,
    clearApplicationForm,
    showPopUp
  }) => {

  const [purpose, setPurpose] = useState(false);
  const [isCheckout, setCheckout] = useState(false);
  const [isErrors, setErrors] = useState(false);
  const [isErrorsVisible, setErrorsVisible] = useState(false);

  const purposeName = purpose ? CreditPurpose[purpose.toUpperCase()].label : ``;

  const handleCreditSelect = useCallback(
    (newPurpose) => {
      setPurpose(newPurpose);
      clearCalculatorForm();
    }, [clearCalculatorForm]
  );

  const handleFormSubmit = useCallback(
    (evt) => {
      evt.preventDefault();

      if (isErrors) {
        setErrorsVisible(true);
        return;
      }

      setCheckout(false);
      setPurpose(false);
      saveNewApplication({
         purpose: purposeName,
         propertyValue,
         initialFee,
         creditTerm,
        });
      clearCalculatorForm();
      clearApplicationForm();
      showPopUp(ModalType.POP_UP);

    }, [isErrors, saveNewApplication, purposeName, propertyValue, initialFee, creditTerm, clearCalculatorForm, clearApplicationForm, showPopUp]
  );

  const closeApplicationForm = useCallback(
    () => {
      if (isCheckout) {
        setCheckout(false)
      }

      return;
    }, [isCheckout]
  );

  return (
    <section id="calculator" className="calculator">
      <div className="container">
        <div className="calculator__wrapper container__wrapper">
          <h2 className="calculator__title">Кредитный калькулятор</h2>
          <form action="#" className="calculator__form form" onSubmit={handleFormSubmit}>
            <div className="calculator__steps-wrapper">
              <StepOne creditPurpose={purpose} onChangePurpose={handleCreditSelect} />

              {purpose && <StepTwo creditPurpose={purpose} />}
            </div>
            {purpose &&
              <Offer propertyValue={propertyValue} initialFee={initialFee} creditTerm={creditTerm}
              isMaternalCapital={isMaternalCapital} isComprehensive={isComprehensive} isInsurance={isInsurance}
              creditPurpose={purpose} onClickCheckout={setCheckout} onChangeData={closeApplicationForm} />}

            {isCheckout &&
            <StepThree propertyValue={propertyValue} initialFee={initialFee} creditTerm={creditTerm} purpose={purpose}
              purposeName={purposeName} isErrorsVisible={isErrorsVisible} setErrors={setErrors} setErrorsVisible={setErrorsVisible} />}
          </form>
        </div>
      </div>
    </section>
  );
};

Calculator.propTypes = {
  propertyValue: PropTypes.number.isRequired,
  initialFee: PropTypes.number.isRequired,
  creditTerm: PropTypes.number.isRequired,
  isMaternalCapital: PropTypes.bool.isRequired,
  isComprehensive: PropTypes.bool.isRequired,
  isInsurance: PropTypes.bool.isRequired,
  saveNewApplication: PropTypes.func.isRequired,
  clearApplicationForm: PropTypes.func.isRequired,
  clearCalculatorForm: PropTypes.func.isRequired,
  showPopUp: PropTypes.func.isRequired,
}

const mapStateToProps = (store) => ({
  propertyValue: store.creditData.propertyValue,
  initialFee: store.creditData.initialFee,
  creditTerm: store.creditData.creditTerm,
  isMaternalCapital: store.creditData.maternal,
  isComprehensive: store.creditData.comprehensive,
  isInsurance: store.creditData.insurance,
});

const mapDispatchToProps = (dispatch) => ({

  saveNewApplication(data) {
    dispatch(saveApplication(data));
  },
  clearCalculatorForm() {
    dispatch(clearCreditData());
  },
  clearApplicationForm() {
    dispatch(clearClientData());
  },

});

export {Calculator};
export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
