import React, { useEffect, useState} from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Moment from "moment";
import "~/CSS/AccountInfor.css"
import "~/CSS/Base.css"
AccountInfor.propTypes = {};

function AccountInfor(props) {
  const currentAccount = JSON.parse(window.localStorage.getItem('user'));
  

  return (
    
   <>
 
    <div className="Account_Infor">        
      <div className="Container_Infor">
        
          <img className="User_avatar_img" src={currentAccount.image.path} />

        <p className="User_name">{currentAccount.userName}</p>
      </div>
      <div className="Detail_Infor">
        <div class="profile-info-row">
          <div class="profile-info-name">Số điện thoại:</div>
          <div class="profile-info-value">
            <span>{currentAccount.phone}</span>
          </div>
        </div>
        <div class="profile-info-row">
          <div class="profile-info-name">Email:</div>
          <div class="profile-info-value">
            <span>{currentAccount.email}</span>
          </div>
        </div>
        <div class="profile-info-row">
          <div class="profile-info-name">Giới tính:</div>
          <div class="profile-info-value">
            <span>{currentAccount.gender}</span>
          </div>
        </div>
        <div class="profile-info-row">
          <div class="profile-info-name">Ngày tháng năm sinh:</div>

          <div class="profile-info-value">
            <span>
              {Moment(currentAccount.dateOfBirth).format("DD-MM-YYYY")}
            </span>
          </div>
        </div>
        <div class="profile-info-row">
          <div class="profile-info-name">Ngày tạo tài khoản:</div>

          <div class="profile-info-value">
            <span>
              {Moment(currentAccount.crete_date).format("DD-MM-YYYY")}
            </span>
          </div>
        </div>
        <div class="profile-info-row">
          <div class="profile-info-name"> Địa chỉ:</div>
          <div class="profile-info-value">
            {currentAccount.addresses.map((address) => (
              <span>
                {address.context +
                  ", " +
                  address.ward +
                  ", " +
                  address.district +
                  ", " +
                  address.province}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
   </>
  );
}

export default AccountInfor;
