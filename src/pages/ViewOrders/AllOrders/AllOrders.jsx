import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import "./AllOrders.scss";

function AllOrders({ value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div className="day-range">
            <Typography>ksjdbosbp</Typography>
          </div>
        </Box>
      )}
    </div>
  );
}

AllOrders.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default AllOrders;
