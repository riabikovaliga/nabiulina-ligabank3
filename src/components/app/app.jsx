import React, {Fragment, useState, useEffect, useCallback} from 'react';
import {useMediaQuery} from 'react-responsive';
import Header from "../header/header";
import Main from "../main/main";
import Footer from "../footer/footer";
import Modal from "../modal/modal";
import PopUp from "../pop-up/pop-up";
import {Key, Viewport, defaultAnimation, defaultActiveModal} from "../../const";

const App = () => {

  const isTablet = useMediaQuery({minWidth: Viewport.TABLET.min, maxWidth: Viewport.TABLET.max});
  const isMobile = useMediaQuery({maxWidth: Viewport.MOBILE.max});

  const [activeModal, setActiveModal] = useState(defaultActiveModal);
  const [modalAnimation, setAnimation] = useState(defaultAnimation);

  useEffect(() => {
    if (activeModal.login || activeModal.popup) {
      document.body.style.overflow = `hidden`;
      document.addEventListener(`keydown`, handleEscKeyDown);
    } else {
      document.body.style.overflow = `auto`;
      document.removeEventListener(`keydown`, handleEscKeyDown);
    }
  });

  const handleModalOpening = useCallback(
    (name) => {
      setActiveModal({...activeModal, [name]: true});
    }, [activeModal]
  );

  const handleModalClosing = useCallback(
    (name) => {
      setActiveModal({...activeModal, [name]: false});
      setAnimation(defaultAnimation);

    }, [activeModal]
  );

  const handleEscKeyDown = useCallback(
    (evt) => {
      if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
        evt.preventDefault();
        setActiveModal(defaultActiveModal);
        setAnimation(defaultAnimation);
      }
    }, []
  );

  const handleModalError = useCallback(
    () => {
      setAnimation({ ...modalAnimation, shake: true });
    }, [modalAnimation]
  );

  const handleModalAnimation = useCallback(
    () => {
      if (modalAnimation.fadein) {
        setAnimation({ ...modalAnimation, fadein: false });
      }

      if (modalAnimation.shake) {
        setAnimation({ ...modalAnimation, shake: false });
      }

      return;

    }, [modalAnimation]
  );

  return (
    <Fragment>
      <Header onLoginButtonClick={handleModalOpening} isMobile={isMobile} isTablet={isTablet} />
      <Main isMobile={isMobile} isTablet={isTablet} showPopUp={handleModalOpening} />
      <Footer isMobile={isMobile} isTablet={isTablet} />

      {activeModal.login && <Modal isMobile={isMobile} animation={modalAnimation} onClose={handleModalClosing} 
        onError={handleModalError} onAnimation={handleModalAnimation} />}

      {activeModal.popup && <PopUp isMobile={isMobile} onClose={handleModalClosing} />}
    </Fragment>
  );
};

export default App;
