import React, {useCallback} from 'react';
import PropTypes from "prop-types";
import Icon from "../icon/icon";
import MenuItem from "../menu-item/menu-item";
import {HEADER_MENU_ITEMS, ModalType, IconType} from "../../const";

const Navigation = ({isCompactMenu, isMobileMenu, isMenuOpened, onLoginButtonClick}) => {

  const handleLoginButtonClick = useCallback(
    (evt) => {
      evt.preventDefault();
      onLoginButtonClick(ModalType.LOGIN)
    }, [onLoginButtonClick]
  );

  return (
    <nav className={`navigation ${isMobileMenu ? isMenuOpened ? `navigation--opened` : `navigation--closed` : ``}`}>
      <ul className="navigation__list navigation__list--main">
      {HEADER_MENU_ITEMS.map((item, i) => (
        <MenuItem key ={i + 1} type={`navigation`} title={item} />
      ))}
      </ul>
      <ul className="navigation__list navigation__list--user">
        <li className="navigation__item navigation__item--user">
          {/* eslint-disable-next-line */}
          <a className="navigation__link navigation__link--user" href="#" onClick={handleLoginButtonClick}>
            <Icon icon={IconType.LOGIN} />
            {isCompactMenu || !isMenuOpened ? `` : <span>Войти в Интернет-банк</span>}
          </a>
        </li>
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  isCompactMenu: PropTypes.bool.isRequired,
  isMobileMenu: PropTypes.bool.isRequired,
  isMenuOpened: PropTypes.bool.isRequired,
  onLoginButtonClick: PropTypes.func.isRequired,
};

export default Navigation;
