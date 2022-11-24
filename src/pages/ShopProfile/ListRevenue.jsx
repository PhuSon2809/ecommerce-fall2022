import React, {useState, useEffect} from 'react'
import storeApi from '~/api/storeApi';
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Moment from "moment";
import { Link } from "react-router-dom";
ListRevenue.propTypes = {
    
};

function ListRevenue(props) {
    const currentUser = useSelector((state) => state.account.current);
    const [revenues, setRevenue] = useState([])
    const fetchData = async () => {
      await storeApi.getListRevenue(currentUser.storeID).then((response) =>
      setRevenue(response.data)
      );
    };
    useEffect(() => {
      fetchData()
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    }, []);

    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "đ");
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Mã đơn hàng</TableCell>
              <TableCell align="center">Mã giao dịch momo</TableCell>
              <TableCell align="center">Ngày đặt hàng</TableCell>
              <TableCell align="center">Doanh thu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {revenues.map((revenue) => (
              <TableRow hover>
                <TableCell align="center" component="th" scope="row">
                  <Link
                    style={{ color: "blue" }}
                    to={`/orderDetail/${revenue.orderID}`}
                  >
                    {revenue.orderID}
                  </Link>
                </TableCell>
                <TableCell align="center">
                  {revenue.momoTransaction}
                </TableCell>
  
                <TableCell align="center">
                  {" "}
                  {Moment(revenue.create_Date).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell align="center" style={{ color: "green" }}>
                  +{priceSplitter(revenue.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default ListRevenue;