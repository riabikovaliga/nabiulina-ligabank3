import React, {Fragment, useEffect, useCallback, useState, useRef} from 'react';
import PropTypes from "prop-types";
import {parseNumberToString, parseFractionToString, getAnnuityPayment, getAutoRate, getMortgageRate, getMinIncome, declineNumeral} from "../../utils";
import {OFFER_ITEMS, MATERNAL_CAPITAL, Rate, MinCreditSum, CreditPurpose} from "../../const";

const MIN_COLUMN_WIDTH = 40.57;

const Offer = ({
    propertyValue,
    initialFee,
    creditTerm,
    creditPurpose,
    isMaternalCapital,
    isComprehensive,
    isInsurance,
    onClickCheckout,
    onChangeData
  }) => {

  useEffect(() => {
    onChangeData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyValue, initialFee, creditTerm, creditPurpose, isMaternalCapital, isComprehensive, isInsurance]);

  const columnItem = useRef(null);
  const [columnWidth, setColumnWidth] = useState(MIN_COLUMN_WIDTH);

  const isMortgage = creditPurpose === CreditPurpose.MORTGAGE.type;

  const sum = propertyValue - initialFee - (isMortgage && isMaternalCapital ? MATERNAL_CAPITAL : 0);
  const rate = isMortgage ? getMortgageRate(propertyValue, initialFee, Rate.MORTGAGE) : getAutoRate(propertyValue, isComprehensive, isInsurance, Rate.AUTO);
  const payment = getAnnuityPayment(sum, rate, creditTerm);
  const income = getMinIncome(payment);

  useEffect(() => {
    setColumnWidth(columnItem.current ? (columnItem.current.offsetWidth / columnItem.current.parentElement.offsetWidth) * 100 : MIN_COLUMN_WIDTH)
  }, [income]);

  const isRejection = isMortgage ? sum < MinCreditSum.MORTGAGE : sum < MinCreditSum.AUTO;
  const rejectSum = isMortgage ? parseNumberToString(MinCreditSum.MORTGAGE) : parseNumberToString(MinCreditSum.AUTO);
  const rejectCreditTitle = isMortgage ? `ипотечные кредиты` : `автокредиты`;

  const actualValues = {
    sum: parseNumberToString(sum),
    rate: parseFractionToString(rate),
    payment: parseNumberToString(payment),
    income: parseNumberToString(income),
    };

  const handleCheckoutButtonClick = useCallback(
    (evt) => {
      evt.preventDefault();
      onClickCheckout(true);
    }, [onClickCheckout]
  );

  return (
    <div  className="calculator__offer offer">
      {!isRejection && <Fragment>
      <h3 className="offer__title">Наше предложение</h3>
      <ul className="offer__items">
        {OFFER_ITEMS.map((item, index) => {
          return <li ref={index === 3 ? columnItem : null} key={index + 1} className="offer__item" style={index === 1 ? {minWidth: `${columnWidth}%`} : {}}>
          <p className="offer__value">{actualValues[item.key]}{item.currency ? ` ${declineNumeral(actualValues[item.key], ...item.currency)}` : `%`}</p>
          <span className="offer__subtitle">{typeof item.label === `object` ? item.label[creditPurpose] : item.label}</span>
        </li>
        })}
      </ul>
      <button className="form__submit form__submit--checkout button" type="button" onClick={handleCheckoutButtonClick}>Оформить заявку</button>
    </Fragment>}
    {isRejection && <Fragment>
      <h3 className="offer__title">{`Наш банк не выдаёт ${rejectCreditTitle} меньше ${rejectSum} рублей.`}</h3>
      <p className="offer__rejection">Попробуйте использовать другие параметры для расчёта.</p>
      </Fragment>}
    </div>
  );
};

Offer.propTypes = {
  propertyValue: PropTypes.number.isRequired,
  initialFee: PropTypes.number.isRequired,
  creditTerm: PropTypes.number.isRequired,
  creditPurpose: PropTypes.string.isRequired,
  isMaternalCapital: PropTypes.bool.isRequired,
  isComprehensive: PropTypes.bool.isRequired,
  isInsurance: PropTypes.bool.isRequired,
  onClickCheckout: PropTypes.func.isRequired,
  onChangeData: PropTypes.func.isRequired,
}

export default Offer;
