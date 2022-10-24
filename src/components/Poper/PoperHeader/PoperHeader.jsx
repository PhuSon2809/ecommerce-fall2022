import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./PoperHeader.module.scss";

const cx = classNames.bind(styles);

function PoperHeader({ children }) {
  return (
    <div className={cx("header")}>
      <p className={cx('title')}>{children}</p>
      <div className={cx("line")}></div>
    </div>
  );
}

PoperHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PoperHeader;
