import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Navigate } from "react-router-dom";
import Authenticated from "~/pages/Authenticated/Authenticated";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  // const [isAccount, setIsAccount] = useState(true);

  const currentAccount = useSelector((state) => state.account.current);

  return !currentAccount ?    (
    <Navigate to="/" />
    // <Authenticated/>
  ) :
  <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <Sidebar />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>

}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
