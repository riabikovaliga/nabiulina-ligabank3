import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from "prop-types";
import Logo from "../logo/logo";
import Navigation from "../navigation/navigation";

const Header = ({onLoginButtonClick, isMobile, isTablet}) => {

  const [isMenuOpened, setMenuOpened] = useState(true);

  useEffect(() => {
    if (isMobile) {
      setMenuOpened(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMenuOpened) {
      document.body.style.overflow = `hidden`;
    } else {
      document.body.style.overflow = `auto`;
    }
  });

  const handleBurgerMenuClick = useCallback(
    (evt) => {
      evt.preventDefault();
      setMenuOpened(!isMenuOpened);
    }, [isMenuOpened]
  );

  const handleCloseButtonClick = useCallback(
    (evt) => {
      evt.preventDefault();
      setMenuOpened(false);
    }, []
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper container__wrapper">
          <div className="header__top">
            {isMobile && <button className="header__hamburger-menu" type="button" aria-label="Открыть меню"
            onClick={handleBurgerMenuClick}></button>}
            <Logo name={`header`} type={isMobile ? `mobile` : ``} />
            {isMobile && isMenuOpened && <button className="header__close-menu" type="button" aria-label="Закрыть меню"
            onClick={handleCloseButtonClick}></button>}
          </div>
          <div className="header__navigation">
            <Navigation isCompactMenu={isTablet} isMobileMenu={isMobile} isMenuOpened={isMenuOpened}
            onLoginButtonClick={onLoginButtonClick} />
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onLoginButtonClick: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isTablet: PropTypes.bool.isRequired,
};

export default Header;
