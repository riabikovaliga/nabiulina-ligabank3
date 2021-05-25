import React, {useCallback} from 'react';
import PropTypes from "prop-types";
import Icon from "../icon/icon";
import {IconType, ModalType} from "../../const";

const PopUp = ({isMobile, onClose}) => {

  const handleCloseButtonClick = useCallback(
    () => {
      onClose(ModalType.POP_UP);
    }, [onClose]
  );

  return (
    <section className="modal">
      <h2 className="visually-hidden">Информационное сообщение</h2>
      <div className="modal__window modal__window--pop-up">
        <button type="button" className="modal__close" aria-label="Закрыть поп-ап" onClick={handleCloseButtonClick}>
          {isMobile? <Icon icon={IconType.CLOSE_MOBILE} /> : <Icon icon={IconType.CLOSE} />}
        </button>
        <h3 className="modal__title">Спасибо за обращение в&nbsp;наш банк.</h3>
        <p className="modal__message">Наш менеджер скоро свяжется с вами по&nbsp;указанному номеру телефона.</p>
      </div>
    </section>
  );
};

PopUp.propTypes = {
  isMobile: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default PopUp;
