import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "./AllOrders.scss";
import ordersApi from "~/api/ordersApi";

function AllOrders({ tabValue, index, ...other }) {
  const [value, setValue] = useState(new Date());

  const [orders, setOrders] = useState([]);

  const currentAccount = useSelector((state) => state.account.current);
  console.log(currentAccount);

  const fetchData = async () => {
    await ordersApi
      .getList(currentAccount.storeID)
      .then((response) => setOrders(response.data));
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, [orders]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value, 10);
    setPage(0);
  };

  return (
    <div
      className="all-orders"
      role="tabpanel"
      hidden={tabValue !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {tabValue === index && (
        <Box sx={{ p: 3 }}>
          <div className="inner-day">
            <div className="day-range">
              <Typography>Order date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Day form"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <Typography>to</Typography>
                <DatePicker
                  label="Day to"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>

          <Typography variant="h4">0 Orders</Typography>

          <div className="table">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: "45%" }} align="left">
                      Product
                    </TableCell>
                    <TableCell sx={{ width: "10%" }} align="left">
                      Total
                    </TableCell>
                    <TableCell sx={{ width: "15%" }} align="left">
                      Status
                    </TableCell>
                    <TableCell sx={{ width: "15%" }} align="left">
                      Transport
                    </TableCell>
                    <TableCell sx={{ width: "15%" }} align="left">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((row) => (
                    <TableRow
                      hover
                      key={row.orderID}
                      //   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        <div className="infor">
                          {row.details.map((detail) => (
                            <div key={detail.orderDetailID} className="inner">
                              <div className="img">
                                <img
                                  src={detail.sub_ItemImage}
                                  alt="products"
                                />
                              </div>
                              <div className="name">
                                <Typography variant="h6">
                                  {detail.sub_ItemName}
                                </Typography>
                                <Typography className="amount gray">
                                  Amount: {detail.amount}
                                </Typography>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <Typography>đ100.000</Typography>
                        <Typography className="gray">Is Pay</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography className="bold">
                          {row.orderShip.status}
                        </Typography>
                        <Typography className="gray">Is Pay</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography className="bold">đ100.000</Typography>
                        <Typography className="gray">Is Pay</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography>Shipping information</Typography>
                        {row.orderStatus.orderStatusID === 1 && (
                          <Typography>Cancel order</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </Box>
      )}
    </div>
  );
}

AllOrders.propTypes = {
  index: PropTypes.number.isRequired,
  tabValue: PropTypes.number.isRequired,
};

export default AllOrders;
