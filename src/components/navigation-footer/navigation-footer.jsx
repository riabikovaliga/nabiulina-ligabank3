import React from 'react';
import MenuItem from "../menu-item/menu-item";
import {FOOTER_MENU_ITEMS} from "../../const";

const NavigationFooter = () => {

  return (
      <ul className="footer__item footer__navigation navigation-footer">
      {FOOTER_MENU_ITEMS.map((item, i) => (
        <MenuItem key ={i + 1} type={`navigation-footer`} title={item} />
      ))}
      </ul>
  );
};

export default NavigationFooter;
