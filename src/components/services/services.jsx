import React from 'react';
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs";
import TabItem from "../tab-item/tab-item";
import {Service, Tab} from "../../const";

const {DEPOSITS, CREDITS, INSURANCE, ONLINE} = Tab;

const Services = ({isSwipeable, isWebPSupport}) => {

  return (
    <section className="services">
      <h2 className="visually-hidden">Услуги банка</h2>
        <div className="container">
          <div className="services__wrapper container__wrapper">
            <Tabs isSwipeable={isSwipeable} renderTab={(activeTab) => {
                switch (activeTab) {
                  case DEPOSITS.index:
                    return <TabItem className={DEPOSITS.name} data={Service.DEPOSITS} isWebP={isWebPSupport} />;
                  case CREDITS.index:
                    return <TabItem className={CREDITS.name} data={Service.CREDITS} isWebP={isWebPSupport} />;
                  case INSURANCE.index:
                    return <TabItem className={INSURANCE.name} data={Service.INSURANCE} isWebP={isWebPSupport} />;
                  case ONLINE.index:
                    return <TabItem className={ONLINE.name} data={Service.ONLINE} isWebP={isWebPSupport} />;
                  default:
                    return null;
                }
              }} />
          </div>
        </div>
    </section>
  );
};

Services.propTypes = {
  isSwipeable: PropTypes.bool.isRequired,
  isWebPSupport: PropTypes.bool.isRequired,
};

export default Services;
