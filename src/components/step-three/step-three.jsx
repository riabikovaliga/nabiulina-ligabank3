import React, {Fragment, useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import CalculatorStep from "../calculator-step/calculator-step";
import Application from "../application/application";
import ApplicationForm from "../application-form/application-form";
import {saveClientData} from "../../store/slice";
import {CalculatorStage} from "../../const";

const StepThree = ({
    currentNumber,
    clientData,
    saveClient,
    propertyValue,
    initialFee,
    creditTerm,
    purpose,
    purposeName,
    isErrorsVisible,
    setErrors,
    setErrorsVisible
  }) => {

  const [isAnimation, setAnimation] = useState(false);

  useEffect(() => {
    if (isErrorsVisible) {
      setAnimation(true)
    }
  }, [isErrorsVisible]);

  const handleAnimation = useCallback(
    () => {
      setAnimation(false)
      return;
    }, []
  );

  return (
    <Fragment>
      <CalculatorStep name={CalculatorStage.THREE.name} title={CalculatorStage.THREE.title}
        isAnimation={isAnimation} onAnimationEnd={handleAnimation} >
        <Application number={currentNumber} purpose={purpose} purposeName={purposeName}
        propertyValue={propertyValue} initialFee={initialFee} creditTerm={creditTerm} />
        <ApplicationForm clientData={clientData} onChangeInput={saveClient} isErrorsVisible={isErrorsVisible}
          setErrors={setErrors} setErrorsVisible={setErrorsVisible} />
        <button className="form__submit form__submit--send button" type="submit">Отправить</button>
      </CalculatorStep>
    </Fragment>
  );
};

StepThree.propTypes = {
  currentNumber: PropTypes.number.isRequired,
  clientData: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  propertyValue: PropTypes.number.isRequired,
  initialFee: PropTypes.number.isRequired,
  creditTerm: PropTypes.number.isRequired,
  purpose: PropTypes.string.isRequired,
  purposeName: PropTypes.string.isRequired,
  saveClient: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  setErrorsVisible: PropTypes.func.isRequired,
  isErrorsVisible: PropTypes.bool,
}

const mapStateToProps = (store) => ({
  currentNumber: store.currentApplicationNumber,
  clientData: store.clientData,
});

const mapDispatchToProps = (dispatch) => ({

  saveClient(data) {
    dispatch(saveClientData(data));
  },
});

export {StepThree};
export default connect(mapStateToProps, mapDispatchToProps)(StepThree);
