import React, {useCallback, useEffect, useRef} from 'react';
import PropTypes from "prop-types";
import FormFieldset from "../form-fieldset/form-fieldset";
import Label from "../label/label";
import Input from "../input/input";
import InputRef from "../input-ref/input-ref";
import InputMasked from "../input-masked/input-masked";
import {ApplicationFormField} from "../../const";
import {validateFields} from '../../utils';

const {NAME, PHONE, EMAIL} = ApplicationFormField;

const ApplicationForm = ({clientData, onChangeInput, isErrorsVisible, setErrors, setErrorsVisible}) => {

  const inputName = useRef();

  const errors = validateFields(clientData);

  useEffect(() => {
    inputName.current.focus();
  }, []);

  useEffect(() => {
    if (errors[NAME.name] || errors[PHONE.name] || errors[EMAIL.name]) {
      setErrors(true)
    } else {
      setErrors(false)
    }
  }, [errors, setErrors]);

  const handleFieldChange = useCallback(
    (evt) => {

        if (isErrorsVisible) {
          setErrorsVisible(false);
        }

        onChangeInput({...clientData, [evt.target.name]: evt.target.value});
    }, [clientData, onChangeInput, isErrorsVisible, setErrorsVisible]
  );

  return (
      <div className="calculator__application-form">
        <FormFieldset name={NAME.name} legend={NAME.legend}>
          <Label name={NAME.name} label={NAME.placeholder} />
          <InputRef ref={inputName} name={NAME.name} type={NAME.type} value={clientData[NAME.name]}
            placeholder={NAME.placeholder} isError={isErrorsVisible && errors[NAME.name]} onChangeInput={handleFieldChange} />
        </FormFieldset>

        <FormFieldset name={PHONE.name} legend={PHONE.legend}>
          <Label name={PHONE.name} label={PHONE.placeholder} />
          <InputMasked mask={PHONE.mask} name={PHONE.name} type={PHONE.type} value={clientData[PHONE.name]}
            placeholder={PHONE.placeholder} isError={isErrorsVisible && errors[PHONE.name]} onChangeInput={handleFieldChange} />
        </FormFieldset>

        <FormFieldset name={EMAIL.name} legend={EMAIL.legend}>
          <Label name={EMAIL.name} label={EMAIL.placeholder} />
          <Input name={EMAIL.name} type={EMAIL.type} value={clientData[EMAIL.name]} placeholder={EMAIL.placeholder}
            isError={isErrorsVisible && errors[EMAIL.name]} onChangeInput={handleFieldChange} />
        </FormFieldset>
      </div>
  );
};

ApplicationForm.propTypes = {
  clientData: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onChangeInput: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  setErrorsVisible: PropTypes.func.isRequired,
  isErrorsVisible: PropTypes.bool,
}

export default ApplicationForm;
