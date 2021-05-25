import React, {useState, useCallback, useEffect, useRef} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import FormFieldset from "../form-fieldset/form-fieldset";
import Label from "../label/label";
import Input from "../input/input";
import InputRef from "../input-ref/input-ref";
import Icon from "../icon/icon";
import {saveUserData, clearUserData} from "../../store/slice";
import {IconType, ModalFormField} from "../../const";
import {validateFields} from '../../utils';

const {LOGIN, PASSWORD} = ModalFormField;

const ModalForm = ({userData, saveUser, clearForm, onSubmitForm, onSubmitError}) => {

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isErrors, setErrors] = useState({[LOGIN.name]: false, [PASSWORD.name]: false});

  const inputLogin = useRef();

  useEffect(() => {
    inputLogin.current.focus();
  }, []);

  const errors = validateFields(userData);

  const handleFieldChange = useCallback(
    (evt) => {
      if (isErrors[LOGIN.name] || isErrors[PASSWORD.name]) {
        setErrors({[LOGIN.name]: false, [PASSWORD.name]: false})
      }

      saveUser({...userData, [evt.target.name]: evt.target.value});
    }, [isErrors, saveUser, userData]
  );

  const handleShowPassword = useCallback(
    () => {
      setPasswordVisible(true)
    }, []
  );

  const handleHidePassword = useCallback(
    () => {
      setPasswordVisible(false)
    }, []
  );

  const handleFormSubmit = useCallback(
    (evt) => {
     evt.preventDefault();

     if (errors[LOGIN.name] || errors[PASSWORD.name]) {
        setErrors(errors)
        onSubmitError(true);
      return;
     }

      clearForm();
      onSubmitForm();

    }, [errors, clearForm, onSubmitForm, onSubmitError]
  );

    return (
        <form action="#" className="modal__form form" onSubmit={handleFormSubmit}>

          <FormFieldset name={LOGIN.name} legend={LOGIN.legend}>
            <Label name={LOGIN.name} label={LOGIN.label} isLabelVisible={true}/>
            <InputRef ref={inputLogin} name={LOGIN.name} type={LOGIN.type} value={userData[LOGIN.name]}
            isError={isErrors[LOGIN.name]} onChangeInput={handleFieldChange} />
          </FormFieldset>

          <FormFieldset name={PASSWORD.name} legend={PASSWORD.legend}>
            <Label name={PASSWORD.name} label={PASSWORD.label} isLabelVisible={true}/>
            <Input name={PASSWORD.name} type={isPasswordVisible ? PASSWORD.type.visible : PASSWORD.type.invisible}
              value={userData[PASSWORD.name]} isError={isErrors[PASSWORD.name]} onChangeInput={handleFieldChange} />
            <button className="form__show-password" type="button" aria-label="Показать пароль"
              onMouseDown={handleShowPassword} onMouseUp={handleHidePassword} onMouseLeave={handleHidePassword}
              onTouchStart={handleShowPassword} onTouchEnd={handleHidePassword} onTouchCancel={handleHidePassword}>
                <Icon icon={IconType.PASSWORD} />
            </button>
          </FormFieldset>

          {/* eslint-disable-next-line */}
          <a className="form__restore-password" href="#">Забыли пароль?</a>
          <button className="form__submit form__submit--login button" type="submit" >Войти</button>
        </form>
      );
};

ModalForm.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string
  }).isRequired,
  saveUser: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
}

const mapStateToProps = (store) => ({
  userData: store.userData,
});

const mapDispatchToProps = (dispatch) => ({
  saveUser(data) {
    dispatch(saveUserData(data));
  },
  clearForm() {
    dispatch(clearUserData());
  }
});

export {ModalForm};
export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);
