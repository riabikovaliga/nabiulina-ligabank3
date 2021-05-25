import React from 'react';
import PropTypes from "prop-types";
import {parseNumberToString, declineNumeral} from "../../utils";
import {APPLICATION_ITEMS} from "../../const";

const Application = ({number, purpose, purposeName, propertyValue, initialFee, creditTerm}) => {

  const actualValues = {
    number: `№ ${number < 10 ? `000${number}` : `00${number}`}`,
    purpose: purposeName,
    propertyValue: parseNumberToString(propertyValue),
    initialFee: parseNumberToString(initialFee),
    creditTerm
  };

  return (
      <ul className="calculator__application">
        {APPLICATION_ITEMS.map((item, index) => {
          return <li key={index + 1} className="calculator__application-item">
          <span className="calculator__application-subtitle">{typeof item.label === `object` ? item.label[purpose] : item.label}</span>
          <p className="calculator__application-value">{actualValues[item.key]}{item.currency ? ` ${declineNumeral(actualValues[item.key], ...item.currency)}` : ``}</p>
        </li>
        })}
      </ul>
  );
};

Application.propTypes = {
  number: PropTypes.number.isRequired,
  purpose: PropTypes.string.isRequired,
  purposeName: PropTypes.string.isRequired,
  propertyValue: PropTypes.number.isRequired,
  initialFee: PropTypes.number.isRequired,
  creditTerm: PropTypes.number.isRequired,
}

export default Application;
