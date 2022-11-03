import React from "react";
import PropTypes from "prop-types";
import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';

FormSubList.propTypes = {};

function FormSubList({subItemFormList}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      phone: "",
    },
  });


  const handleClose = (index) => {
    console.log(subItemFormList);
    subItemFormList.slice()
    // subItemFormList.remove()
  }

  return (
    <>
      <Box component={Paper}>
        <Typography>Nhóm phân loại</Typography>
        <TextField
          {...register("subItem")}
          autoComplete="off"
          fullWidth
          label="Phân loại hàng"
          variant="outlined"
          margin="normal"
          sx={{ width: "50%", padding: 0 }}
        />
        <TextField
          {...register("amount")}
          autoComplete="off"
          fullWidth
          label="Số lượng"
          variant="outlined"
          margin="normal"
          sx={{ width: "50%", padding: 0 }}
        />
        <TextField
          {...register("price")}
          autoComplete="off"
          fullWidth
          label="Đơn giá"
          variant="outlined"
          margin="normal"
          sx={{ width: "50%", padding: 0 }}
        />
        <TextField
          {...register("image")}
          autoComplete="off"
          fullWidth
          label="Hình ảnh"
          variant="outlined"
          margin="normal"
          sx={{ width: "50%", padding: 0 }}
        />
        <Button onClick={handleClose}><CloseIcon></CloseIcon></Button>
      </Box>
    </>
  );
}

export default FormSubList;
