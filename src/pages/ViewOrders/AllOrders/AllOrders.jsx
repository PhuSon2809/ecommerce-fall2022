import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ClearIcon from "@mui/icons-material/Clear";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import ordersApi from "~/api/ordersApi";
import "./AllOrders.scss";
import formatDate from "~/utils/formatDate";
import currencyFormat from "~/utils/formatPrize";
import { useNavigate } from "react-router-dom";

function AllOrders({ tabValue, index, ...other }) {
  const currentAccount = useSelector((state) => state.account.current);
  const [value, setValue] = useState(new Date());
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    await ordersApi
      .getListOrder(currentAccount.storeID)
      .then((response) => setOrders(response.data));
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, [orders]);

  /** =========== Pagination ===========*/
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigate = useNavigate();

  const handleClickDetail = (orderID) => {
    console.log(orderID);
    navigate(`/orderDetail/${orderID}`);
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
          <div className="inner-day" style={{ marginBottom: "20px" }}>
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
                    <TableCell sx={{ width: "40%" }} align="left">
                      Product
                    </TableCell>
                    <TableCell sx={{ width: "10%" }} align="left">
                      Total Order
                    </TableCell>
                    <TableCell sx={{ width: "10%" }} align="left">
                      Transport
                    </TableCell>
                    <TableCell sx={{ width: "15%" }} align="left">
                      Status
                    </TableCell>
                    <TableCell sx={{ width: "15%" }} align="left">
                      Date create
                    </TableCell>
                    <TableCell sx={{ width: "10%" }} align="left">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((row) => (
                    <TableRow hover key={row.orderID}>
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
                                <Typography className="itemName">
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
                        <Typography className="bold">
                          {currencyFormat(
                            row.details.reduce(function (total, detail) {
                              return (total +=
                                detail.pricePurchase * detail.amount);
                            }, 0)
                          )}
                        </Typography>
                        <Typography className="gray">
                          {row.orderStatus.statusName}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography className="bold">
                          {currencyFormat(row.feeShip)}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography className="bold">
                          {row.orderShip?.status}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography>{formatDate(row.create_Date)}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexDirection: "column",
                          }}
                        >
                          <Button
                            variant="outlined"
                            color="success"
                            startIcon={<RemoveRedEyeIcon />}
                            onClick={() => handleClickDetail(row.orderID)}
                          >
                              Detail
                          </Button>
                          {row.orderStatus.orderStatusID === 1 && (
                            <Button
                              variant="outlined"
                              color="error"
                              startIcon={<ClearIcon />}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
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
