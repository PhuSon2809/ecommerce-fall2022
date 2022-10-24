import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./LabelStatus.module.scss";

const cx = classNames.bind(styles);

function LabelStatus({
  active = false,
  inactive = false,
  standard = false,
  online = false,
  offline = false,
  children,
  className,
}) {
  let Comp = "label";

  const classes = cx("wrapper", {
    [className]: className,
    active,
    inactive,
    standard,
    online,
    offline,
  });

  return <Comp className={classes}>{children}</Comp>;
}

LabelStatus.propTypes = {
  active: PropTypes.bool,
  inactive: PropTypes.bool,
  standard: PropTypes.bool,
  online: PropTypes.bool,
  offline: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default LabelStatus;
