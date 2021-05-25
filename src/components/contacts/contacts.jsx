import React from 'react';
import Icon from "../icon/icon";
import {CONTACTS, IconType} from "../../const";

const Contacts = () => {

  return (
      <ul className="footer__item footer__contacts">
      {CONTACTS.map((contact, i) => (
        <li key ={i + 1} className={`footer__contacts-item footer__contacts-item--${contact.type}`}>
          <a className="footer__contacts-link" href={`tel: ${contact.number}`}>
            <Icon icon={IconType[`${contact.type.toUpperCase()}`]} />
            {contact.number}
          </a>
          <p className="footer__contacts-text">{contact.description}</p>
        </li>
      ))}
      </ul>
  );
};

export default Contacts;
