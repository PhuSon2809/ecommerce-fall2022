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
import axios from "axios";
import Loading from "~/pages/Loading";
import {  Dialog, DialogTitle, DialogActions, DialogContent} from '@mui/material';
function AllOrders({ tabValue, index, ...other }) {
  const currentAccount = useSelector((state) => state.account.current);
  const [value, setValue] = useState(new Date());
  const [orders, setOrders] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const fetchData = async () => {
    await ordersApi.getListOrder(currentAccount.storeID).then((response) => {
      setOrders(response.data);
      setLoadings(true);
    });
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
  // const handleClickCancle = (orderID) => {
  //   console.log(orderID);
  //   await axios.get(`http://esmpfree-001-site1.etempurl.com/api/Payment/cancel_order`)
  // }
  //cancle order
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);
  const [itemClick, setCancelOrderClick] = useState({});

const handleClose = () => {
    setOpen(false)
}

  const handleOnChangeReason = (event) => {
    setReason(event.target.value);
  };

  const handleSubmitReason = (id) => {
    try {
      const formCancel = {
        reason: reason,
        orderID:itemClick
      };
      console.log("formCancel : ", formCancel);
      console.log("id", itemClick);
      console.log("reason", reason);
      // call api

       axios.put(`http://esmpfree-001-site1.etempurl.com/api/Payment/cancel_order?orderID=${itemClick}&reason=${reason}`).then(handleClose)

    } catch (error) {
      console.log("fail to update: ", error);
    }
  };

  const handleOpenReasonsForm = (id) => {
    setOpen(true)
    setCancelOrderClick(id)
  };

  return (
    <>
      {loadings ? (
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
              <div className="inner-day" style={{ marginBottom: "20px" }}></div>

              <Typography variant="h4">{orders.length} Orders</Typography>

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
                      {(rowsPerPage > 0
                        ? orders.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : orders
                      ).map((row) => (
                        <TableRow hover key={row.orderID}>
                          <TableCell align="left">
                            <div className="infor">
                              {row.details.map((detail) => (
                                <div
                                  key={detail.orderDetailID}
                                  className="inner"
                                >
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
                            <Typography>
                              {formatDate(row.create_Date)}
                            </Typography>
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
                              {row?.orderShip?.shipStatusID == "1" ||
                                (row?.orderShip?.shipStatusID == "-2" && (
                                    <Button
                                      variant="outlined"
                                      color="error"
                                      onClick={() => {
                                        handleOpenReasonsForm(row.orderID);
                                      }}
                                      startIcon={<ClearIcon />}
                                    >
                                      Cancel
                                    </Button>
                                    
                                
                                ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20, { label: "all", value: -1 }]}
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
      ) : (
        <Loading />
      )}
         <Dialog
                open={open}
            >
                <DialogTitle
                    sx={{
                        textAlign: "center",
                        borderBottom: "1px solid #d3d3d3",
                    }}
                >
                    Enter reason for cancel.
                </DialogTitle>
                <DialogContent sx={{ marginTop: "10px", display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <TextField required onChange={handleOnChangeReason} alt="avatar" sx={{ position: 'static !important', mr: 2, width: '300px'}}></TextField>
                </DialogContent>


                <DialogActions>
                    <Button color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmitReason}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
    </>
  );
}

AllOrders.propTypes = {
  index: PropTypes.number.isRequired,
  tabValue: PropTypes.number.isRequired,
};

export default AllOrders;
