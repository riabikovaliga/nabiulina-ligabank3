import React, {useState, useEffect, useCallback} from 'react';
import {useSwipeable} from "react-swipeable";
import PropTypes from "prop-types";
import Slide from "../slide/slide";
import Dot from "../dot/dot";
import {SLIDES, SLIDER_INTERVAL, SLIDER_TRANSITION, SLIDER_TRANSLATE} from "../../const";

const Slider = ({isSwipeable, isWebPSupport}) => {

  const [current, setCurrent] = useState({
    activeSlide: 1,
    direction: 1,
    translate: -(SLIDER_TRANSLATE),
    transition: 0,
    slides: [SLIDES[2], SLIDES[0], SLIDES[1]]
  })

  const {activeSlide, direction, translate, transition, slides} = current;

  const scrollSlideForward = () => {
      return setCurrent({
        ...current,
        activeSlide: activeSlide === 3 ? 1 : activeSlide + 1,
        translate: translate - SLIDER_TRANSLATE,
        transition: SLIDER_TRANSITION,
      })
    };

  const scrollSlideBackwards = () => {
        return setCurrent({
          ...current,
          translate: translate + SLIDER_TRANSLATE,
          transition: SLIDER_TRANSITION,
          activeSlide: activeSlide === 1 ? 3 : activeSlide - 1,
          direction: -1
        })
    };

  const handleSliderTransition = useCallback(
    () => {
      if (direction === -1) {
        return setCurrent({
            ...current,
            transition: 0,
            translate: -(SLIDER_TRANSLATE),
            slides: [slides[2], slides[0], slides[1]],
            direction: 1
          })
        }

        return setCurrent({
          ...current,
          transition: 0,
          translate: -(SLIDER_TRANSLATE),
          slides: [slides[1], slides[2], slides[0]],
        })
    }, [slides, direction, current]
  );

  useEffect(() => {
    const timer = setInterval(() => {
        scrollSlideForward();
    }, SLIDER_INTERVAL);
    return () => clearInterval(timer);
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => isSwipeable ? scrollSlideForward() : ``,
    onSwipedRight: () => isSwipeable ? scrollSlideBackwards() : ``,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <section className="slider">
      <h2 className="visually-hidden">Слайдер с промо-предложениями</h2>
      <div className="slider__wrapper"
      style={{transform: `translateX(${translate}px)`, transition: `transform ease-out ${transition}s`}}
      onTransitionEnd={handleSliderTransition} {...handlers}>
        {slides.map((slide, index) => {
          return <Slide key={index + 1} index={slide.index} text={slide.text} button={slide.button} isWebP={isWebPSupport} />
        })}
      </div>
      <div className="slider__dots dots">
        {slides.map((_slide, index) => {
          return <Dot key={index + 1} isActive={index + 1 === activeSlide} isLight={activeSlide !== 3} />
        })}
      </div>
    </section>
  );
};

Slider.propTypes = {
  isSwipeable: PropTypes.bool.isRequired,
  isWebPSupport: PropTypes.bool.isRequired,
};

export default Slider;
