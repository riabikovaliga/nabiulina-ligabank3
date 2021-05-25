import React, {Fragment, useState, useCallback} from "react";
import {useSwipeable} from "react-swipeable";
import PropTypes from "prop-types";
import Icon from "../icon/icon";
import Dot from "../dot/dot";
import {Tab, Service, IconType} from "../../const";

const Tabs = ({isSwipeable, renderTab}) => {

  const [activeTab, setActiveTab] = useState(Tab.DEPOSITS.index);
  const [animation, setAnimation] = useState(false);

  const handleTabClick = useCallback(
      (evt) => {
        evt.preventDefault();
        setActiveTab(Number(evt.target.id));
      }, []
  );

  const scrollSlideForward = () => {
    setActiveTab(
      activeTab === 4 ? 1 : activeTab + 1,
    )
    setAnimation(`next`)
  };

  const scrollSlideBackwards = () => {
    setActiveTab(
     activeTab === 1 ? 4 : activeTab - 1,
    )
    setAnimation(`back`)
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => isSwipeable ? scrollSlideForward() : ``,
    onSwipedRight: () => isSwipeable ? scrollSlideBackwards() : ``,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <Fragment>
    <div className={`services__tabs ${animation ? `services__tabs--${animation}`  : ``}`}
    onAnimationEnd={() => setAnimation(false)} {...handlers}>
        {!isSwipeable &&  <ul className="services__nav-list">
          {Object.keys(Tab).map((tab, index) => (
            <li key={index + 1} className="services__nav-item">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" id={index + 1}
                className={`services__nav-link ${Tab[tab].index === activeTab ? `services__nav-link--active` : ``}`}
                onClick={handleTabClick}>
                <span className="services__nav-icon">
                  {Service[tab].name}
                  <Icon icon={IconType[tab]} />
                </span>
              </a>
            </li>
          ))}
        </ul>}

      {renderTab(activeTab)}
    </div>
    {isSwipeable && <div className="services__dots dots">
        {Object.keys(Tab).map((_tab, index) => {
          return <Dot key={index + 1} isActive={index + 1 === activeTab} />
        })}
      </div>}
    </Fragment>
  );
};

Tabs.propTypes = {
  isSwipeable: PropTypes.bool.isRequired,
  renderTab: PropTypes.func.isRequired,
};

export default Tabs;
