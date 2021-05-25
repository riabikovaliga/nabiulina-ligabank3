import React from 'react';
import PropTypes from "prop-types";
import { useWebPSupportCheck } from "react-use-webp-support-check";
import Slider from "../slider/slider";
import Services from "../services/services";
import Calculator from "../calculator/calculator";
import Branches from "../branches/branches";

const Main = ({isMobile, isTablet, showPopUp}) => {

  const isWebPSupport = useWebPSupportCheck();

  return (
    <main className="main">
      <h1 className="visually-hidden">Сайт «Лига Банка»: Кредитный калькулятор</h1>
      <Slider isSwipeable={isMobile || isTablet} isWebPSupport={isWebPSupport} />
      <Services isSwipeable={isMobile || isTablet} isWebPSupport={isWebPSupport} />
      <Calculator showPopUp={showPopUp} />
      <Branches isMobile={isMobile} isTablet={isTablet} />
    </main>
  );
};

Main.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  isTablet: PropTypes.bool.isRequired,
  showPopUp: PropTypes.func.isRequired,
};

export default Main;
