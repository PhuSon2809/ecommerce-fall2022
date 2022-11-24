import React, {useState, useEffect} from 'react'
import storeApi from '~/api/storeApi';
import { useSelector } from "react-redux";
import ListRevenue from './ListRevenue';
import Button from '@mui/material/Button';
import Withdrawal from './Withdrawal';


function ShopProfile() {
  const currentUser = useSelector((state) => state.account.current);
  const [revenue, setRevenue] = useState([])
  const [storeRevenue, setStoreRevenue] = useState([])
  
  const fetchData = async () => {
    await storeApi.getInfoStore(currentUser.storeID).then((response) =>
    setStoreRevenue(response.data)
    );
  };
console.log("storeis",currentUser.storeID)
  useEffect(() => {
    fetchData()
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);

  const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "đ");
  return (
<>
<table className = "income_system">
    <tr>
      <th>Mã giao dịch momo </th>
      <td>{storeRevenue.momoTransactionID}</td>
    </tr>
    <tr>
      <th>Email: </th>
      <td>{storeRevenue.email}</td>
    </tr>
    <tr>
      <th>Số điện thoại: </th>
      <td>{storeRevenue.phone}</td>
    </tr>
    <tr>
      <th>Tên cửa hàng: </th>
      <td>{storeRevenue.storeName}</td>
    </tr>
    <tr>
      <th>
        <h4>Tổng doanh thu: </h4>{" "}
      </th>
      <td  style={{ color: "green", fontSize: "20px" }}>{priceSplitter(storeRevenue.asset)}</td>
    </tr>
    <Withdrawal/>
   
  </table>
  <h3 className="title">List revenue from order</h3>
  
</>

  )
}

export default ShopProfile