import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ClearIcon from "@mui/icons-material/Clear";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import DialerSipOutlinedIcon from "@mui/icons-material/DialerSipOutlined";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ordersApi from "~/api/ordersApi";
import "./OrderDetail.scss";
import formatDate from "~/utils/formatDate";
import currencyFormat from "~/utils/formatPrize";

function OrderDetail(props) {
  const { orderID } = useParams();

  const [order, setOrder] = useState({});

  const fetchData = async () => {
    await ordersApi
      .getOrderDetail(orderID)
      .then((response) => setOrder(response.data));
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, [order]);

  return (
    <div className="orderDetail">
      <Box className="header">
        <Box className="rowItem">
          <Avatar alt="avatar" src="" />
          <Typography className="name">{order.name}</Typography>
        </Box>
        <Box className="rowItem">
          {/* <Typography sx={{ color: "#4ac950" }}>
            <IconButton>
              <LocalShippingOutlinedIcon
                sx={{ color: "#4ac950" }}
                fontSize="medium"
              />
            </IconButton>
            Giao hàng thành công
          </Typography> */}
          <Tooltip title={`Create date: ${formatDate(order.create_Date)}`}>
            <IconButton>
              <HelpOutlineIcon fontSize="medium" />
            </IconButton>
          </Tooltip>

          <Typography
            color="success"
            sx={{
              textTransform: "uppercase",
              color: order.reason !== null ? "red" : "#4ac950",
            }}
          >
            {order.orderStatus?.statusName}
          </Typography>
        </Box>
      </Box>

      <Box className="infor-address">
        <Typography className="title">Địa chỉ lấy hàng:</Typography>
        <Typography>
          <IconButton color="success">
            <StoreOutlinedIcon />
          </IconButton>
          {order.pick_Address} - {order.pick_Ward} - {order.pick_District} -{" "}
          {order.pick_Province}
        </Typography>
        <Typography>
          <IconButton color="success">
            <CallOutlinedIcon />
          </IconButton>
          {order.pick_Tel}
        </Typography>
      </Box>

      <Box className="infor-address">
        <Typography className="title">Địa chỉ giao hàng:</Typography>
        <Typography>
          <IconButton color="success">
            <StoreOutlinedIcon />
          </IconButton>
          {order.address} - {order.ward} - {order.district} - {order.province}
        </Typography>
        <Typography>
          <IconButton color="success">
            <DialerSipOutlinedIcon />
          </IconButton>
          {order.tel}
        </Typography>
      </Box>

      <Box className="listProduct">
        {order.details?.map((detail) => (
          <Box key={detail.orderDetailID} className="product">
            <Box className="infor">
              <Box width={200}>
                <img alt="product" src={detail.sub_ItemImage} />
              </Box>
              <Box>
                <Typography variant="h6">{detail.sub_ItemName}</Typography>
                <Typography sx={{ color: "gray" }}>
                  Amount: {detail.amount}
                </Typography>
              </Box>
            </Box>
            <Typography color="error">
              {currencyFormat(detail.pricePurchase * detail.amount)}
            </Typography>
          </Box>
        ))}
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell width="80%" align="right">
                Tổng tiền hàng:
              </TableCell>
              <TableCell align="right">
                <Typography color="error">
                  {currencyFormat(
                    order.details?.reduce(function (total, detail) {
                      return (total += detail.pricePurchase * detail.amount);
                    }, 0)
                  )}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Phí vận chuyển:</TableCell>
              <TableCell align="right">
                <Typography color="error">
                  + {currencyFormat(order.feeShip)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Phí giảm giá:</TableCell>
              <TableCell align="right">
                {order.details?.map((detail) => (
                  <Typography key={detail.orderDetailID} color="error">
                    - {currencyFormat(detail.discountPurchase)}
                  </Typography>
                ))}
              </TableCell>
            </TableRow>
            <TableRow sx={{ "&:last-child td": { border: 0 } }}>
              <TableCell align="right">Tổng số tiền:</TableCell>
              <TableCell align="right">
                {order.details?.map((detailItem) => (
                  <Typography
                    key={detailItem.orderDetailID}
                    color="error"
                    fontSize="20px"
                  >
                    {currencyFormat(
                      order.details?.reduce(function (total, detail) {
                        return (total += detail.pricePurchase * detail.amount);
                      }, 0) +
                        order.feeShip -
                        detailItem.discountPurchase
                    )}
                  </Typography>
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", gap: "10px" }}>
        <Button
          variant="outlined"
          color="success"
          startIcon={<KeyboardBackspaceIcon />}
        >
          Back
        </Button>
        {order.orderStatus?.orderStatusID === 1 && (
          <Button variant="outlined" color="error" startIcon={<ClearIcon />}>
            Cancel
          </Button>
        )}
      </Box>
    </div>
  );
}

export default OrderDetail;
