import React from 'react';
import PropTypes from "prop-types";

const Slide = ({index, text, button, isWebP}) => {

  return (
    <div className={`slide slide--${index}`}>
      <div className={`slide__wrapper ${isWebP ? `slide__wrapper--webp` : `slide__wrapper--no-webp`} container`}>
          <p className="slide__title">Лига Банк</p>
          <p className="slide__subtitle">{text}</p>
          {/* eslint-disable-next-line */}
          {button && <a className={`slide__button button ${button.className}`} href={button.link}>{button.text}</a>}
        </div>
      </div>
  );
};

Slide.propTypes = {
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  button: PropTypes.shape({
    className: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  isWebP: PropTypes.bool.isRequired,
}

export default Slide;
