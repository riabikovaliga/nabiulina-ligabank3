import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import Logo from "../logo/logo";
import Copyright from "../copyright/copyright";
import NavigationFooter from "../navigation-footer/navigation-footer";
import Contacts from "../contacts/contacts";
import Social from "../social/social";

const Footer = ({isMobile, isTablet}) => {

  const LogoAndCopyright = (
    <Fragment>
      <Logo name={`footer`} type={isMobile ? `mobile_footer` : ``} />
      {!isMobile ? <Copyright /> : <></>}
    </Fragment>
  );

  const isDesktop = !isMobile && !isTablet;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper container__wrapper">
          {isDesktop? <div className="footer__item">
            {LogoAndCopyright}
          </div> : LogoAndCopyright}

          <NavigationFooter />
          <Contacts />
          <Social />
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  isTablet: PropTypes.bool.isRequired,
};

export default Footer;
