import React, { useState, useEffect } from "react";
import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ordersApi from "~/api/ordersApi";
import "./OrderDetail.scss";

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
          <Typography sx={{ color: "#4ac950" }}>
            <LocalShippingOutlinedIcon
              sx={{ color: "#4ac950" }}
              fontSize="medium"
            />
            Giao hàng thành công
          </Typography>
          <Tooltip title={`Create date:`}>
            <IconButton>
              <HelpOutlineIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Typography color="error">ĐÃ GIAO</Typography>
        </Box>
      </Box>

      <Box className="infor-address">
        <Typography variant="h6">Địa chỉ lấy hàng</Typography>
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
        <Typography variant="h6">Địa chỉ giao hàng</Typography>
        <Typography>
          <IconButton color="success">
            <StoreOutlinedIcon />
          </IconButton>
          {order.address} - {order.ward} - {order.district} - {order.province}
        </Typography>
        <Typography>
          <IconButton color="success">
            <CallOutlinedIcon />
          </IconButton>
          {order.tel}
        </Typography>
      </Box>

      <Box className="product">
        <Box>
          <Box>
            <img alt="" src="" />
          </Box>
          <Box>
            <Typography variant="h6">gggggggggggggggggg</Typography>
            <Typography>Amount: </Typography>
          </Box>
        </Box>
        <Box>đ100.000</Box>
      </Box>
    </div>
  );
}

export default OrderDetail;
