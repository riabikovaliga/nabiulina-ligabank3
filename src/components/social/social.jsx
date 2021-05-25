import React from 'react';
import Icon from "../icon/icon";
import {SOCIAL_LINKS, IconType} from "../../const";

const Social = () => {

  return (
      <ul className="footer__item footer__social">
      {SOCIAL_LINKS.map((link, i) => (
        <li key ={i + 1} className="footer__social-item">
        {/* eslint-disable-next-line */}
        <a className={`footer__social-link footer__social-link--${link.type}`} href="#" aria-label={link.label}>
          <Icon icon={IconType[`${link.type.toUpperCase()}`]} />
        </a>
      </li>
      ))}
      </ul>
  );
};

export default Social;
