import React from "react";
import AppsIcon from "@mui/icons-material/Apps";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import HeadlessTippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import images from "~/assets/images";
import Button from "~/components/Button";
import Image from "~/components/Image";
import Poper from "~/components/Poper";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import config from "~/config";

const cx = classNames.bind(styles);

function Header() {
  const renderResult = (attrs) => (
    <div className={cx("pop-wrapper")} tabIndex="-1" {...attrs}>
      <Poper className={cx("menu-wrapper")}>
        <div className={cx("group-btn")}>
          <Button
            className={cx("button")}
            leftIcon={<CropOriginalIcon fontSize="medium" />}
          >
            Shop profile
          </Button>
          <Button
            className={cx("button")}
            leftIcon={<LogoutIcon fontSize="medium" />}
          >
            Logout
          </Button>
        </div>
      </Poper>
    </div>
  );

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link to={config.routes.home} className={cx("left")}>
          <div className={cx("logo-wrapper")}>
            <Image className={cx("logo")} src={images.logo} alt="logo" />
          </div>
          <p>E-SHOP</p>
        </Link>

        <div className={cx("right")}>
          <div>
            <HeadlessTippy
              interactive
              delay={[0, 100]}
              offset={[-5, 5]}
              placement="bottom-end"
              render={renderResult}
            >
              <div className={cx("info")}>
                <Image
                  className={cx("user-avatar")}
                  src="https://firebasestorage.googleapis.com/v0/b/hostelmanagement-ae202.appspot.com/o/Avatar%2F000041.JPG?alt=media&token=4c9b1e96-b765-4265-9930-a4540a1b8230"
                  alt="avatar"
                />
                <span className={cx("user-name")}>Tran Phu Son</span>
              </div>
            </HeadlessTippy>
          </div>

          <div className={cx("line")}></div>

          <div className={cx("action-btn")}>
            <span>
              <AppsIcon fontSize="medium" />
            </span>
            <span>
              <NotificationsActiveIcon fontSize="medium" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
