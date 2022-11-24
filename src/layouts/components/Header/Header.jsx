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
import { useDispatch } from "react-redux";
import { logout } from "~/pages/Authenticated/AccountSlice";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

function Header() {
  const currentAccount = JSON.parse(window.localStorage.getItem('user'));
  const dispatch = useDispatch();

  const handleLogout = () =>{
    window.location.reload(false);
    const action = logout();
    dispatch(action);
  }


  const renderResult = (attrs) => (
    <div className={cx("pop-wrapper")} tabIndex="-1" {...attrs}>
      <Poper className={cx("menu-wrapper")}>
        <div className={cx("group-btn")}>
          <Button
            href = {`/detailAccount/${currentAccount.userID}`}
            className={cx("button")}
            leftIcon={<CropOriginalIcon fontSize="large" />}
          >
            Thông tin người dùng
          </Button>
          <Button
            className={cx("button")}
            leftIcon={<LogoutIcon fontSize="large" />}
            onClick={handleLogout}
          >
            Đăng xuất
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
                src={currentAccount.image.path}
                alt="avatar"
              />
              <span className={cx("user-name")}>{currentAccount.userName}</span>
            </div>
          </HeadlessTippy>

          <div className={cx("line")}></div>

          <div className={cx("action-btn")}>
            <span>
              <AppsIcon fontSize="large" />
            </span>
            <span>
              <NotificationsActiveIcon fontSize="large" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
