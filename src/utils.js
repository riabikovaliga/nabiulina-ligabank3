export const parseNumberToString = (value) => {
  return value.toLocaleString('ru-RU');
};

export const parseFractionToString = (value) => {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2});
};

export const formatString = (string) => {
  return string.replace(/\s/g, '');
};

export const isNumbersOnly = (value) => {
  return (/^[0-9 ]*$/.test(value));
};

export const validateFields = (fields) => {

  const errors = {}

  for (const key of Object.keys(fields)) {
    errors[key] = fields[key].length === 0
  }

  return errors;
};


export const getInitialFee = (propertyValue, percent) => {
  return Math.round(propertyValue * percent);
};

export const getMortgageRate = (propertyValue, initialFee, {normal, low}) => {
  return initialFee >= propertyValue * 0.15 ? low : normal;
};

export const getAutoRate = (propertyValue, isComprehensive, isInsurance, {normal, low, lowest, gainful}) => {

  if (isComprehensive && isInsurance) {
    return gainful;
  } else if (isComprehensive || isInsurance) {
    return lowest;
  } else if (propertyValue >= 2000000) {
    return low;
  } else {
    return normal;
  }
};

export const getAnnuityPayment = (sum, rate, term) => {

  const monthRate = (rate / 100) / 12;
  const termInMonths = term * 12;

  const payment = (sum * monthRate) / (1 - (1 / Math.pow((1 + monthRate), termInMonths)));

  return Math.round(payment);
};

export const getMinIncome = (payment) => {
  return Math.round(payment * 100 / 45);
};

const MIN_INPUT_WIDTH = 10;
const INPUT_SPACES = 15;

export const getInputSize = (stringValue, value) => {
    let size = stringValue.length;;

    switch (true) {
      case value > 999 && value <= 999999:
        size = ((stringValue.length - 1) * MIN_INPUT_WIDTH) + INPUT_SPACES;
        break;
      case value > 999999:
        size = ((stringValue.length - 1.5) * MIN_INPUT_WIDTH) + INPUT_SPACES;
        break;
      default:
        size = (stringValue.length * MIN_INPUT_WIDTH) + INPUT_SPACES;
    }

    return size;
};

export const declineNumeral = (number, singular, genitive, plural) => {
  let form;

  switch (true) {
    case number === 11 || number === 12 || number === 13 || number === 14:
      form = plural;
      break;
    case number % 10 === 1:
      form = singular;
      break;
    case number % 10 === 2 || number % 10 === 3 || number % 10 === 4:
      form = genitive;
      break;
    default:
      form = plural;
  }
  return form;
};

