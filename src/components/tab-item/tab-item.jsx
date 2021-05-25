import React from 'react';
import PropTypes from "prop-types";
import Icon from "../icon/icon";
import {IconType} from "../../const";

const TabItem = ({className, data, isWebP}) => {

  return (
    <div className={`services__tab tab tab--${className} ${isWebP ? `tab--webp` : `tab--no-webp`}`}>
      <div className="tab__wrapper">
        <p className="tab__title">{data.title}</p>
        <ul className="tab__features">
          {data.features.map((item, i) => (
            <li key={i + 1} className="tab__features-item" >
              <Icon icon={IconType.TICK} />
              {item}
            </li>
          ))}
        </ul>
        {data.subtitle && <p className="tab__subtitle">{data.subtitle.text} <a className="tab__link" href="#calculator">{data.subtitle.link}</a></p>}
      </div>
      {/* eslint-disable-next-line */}
      {data.button && <a className="tab__button button" href="#">Узнать подробнее</a>}
    </div>
  )
}

TabItem.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    button: PropTypes.bool.isRequired,
    subtitle: PropTypes.shape({
        text: PropTypes.string,
        link: PropTypes.string,
      }),
  }).isRequired,
};

export default TabItem;
