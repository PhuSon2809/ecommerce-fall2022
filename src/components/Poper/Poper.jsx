import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Poper.module.scss";

const cx = classNames.bind(styles);

function Poper({ children, className }) {
  return <div className={cx("wrapper", className)}>{children}</div>;
}

Poper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Poper;
