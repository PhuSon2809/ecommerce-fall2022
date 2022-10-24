import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import HeadlessTippy from "@tippyjs/react/headless";
import Poper from "~/components/Poper";
import PoperHeader from "../PoperHeader";
import { PoperMenuData } from "~/assets/data/PoperMenuData";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function Menu({ children, hideOnClick = false }) {
  const handleOnclick = () => {
    console.log("est");
  };

  const renderResult = (attrs) => (
    <div className={cx("wrapper")} tabIndex="-1" {...attrs}>
      <Poper className={cx("menu-wrapper")}>
        <PoperHeader>Manager</PoperHeader>
        <div className={cx("action-btn")}>
          {PoperMenuData.map((item, index) => (
            <Button
              className={cx("button", { gray: item.color })}
              key={index}
              leftIcon={item.icon}
              onClick={handleOnclick}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </Poper>
    </div>
  );

  return (
    <HeadlessTippy
      interactive
      delay={[0, 800]}
      offset={[10, -3]}
      placement="bottom-end"
      hideOnClick={hideOnClick}
      render={renderResult}
    >
      {children}
    </HeadlessTippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  hideOnClick: PropTypes.bool,
};

export default Menu;
