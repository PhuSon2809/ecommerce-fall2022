import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CloseIcon from '@mui/icons-material/Close';
import FormSubList from "./form-subList/formSubList";

function AddProduct() {
  const [subItemFormList, setSubItemFormList] = useState([]);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
      discount: "",
      subCategories: "",
      Image: "",
      subItem: "",
      amount: "",
      price: "",
      image: "",
    },
  });

  const handleClose = (index) => {
    console.log(subItemFormList);
    subItemFormList.slice()
    // subItemFormList.remove()
  }

  const handleClickSubItem = (event) => {
    // setIsSubItem(!isSubItem);
    setSubItemFormList(
      subItemFormList.concat(
        <Box
          component={Paper}
          key={subItemFormList.length}
          subItemFormList={subItemFormList}
        >
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
          <Button onClick={handleClose}>
            <CloseIcon></CloseIcon>
          </Button>
        </Box>
        // <FormSubList
        //   key={subItemFormList.length}
        //   subItemFormList={subItemFormList}
        // />
      )
    );
  };



  const submitForm = async (values) => {
    console.log("values: ", values);
    console.log("subItemFormList: ", subItemFormList);
    // try {
    //   const action = login(values);
    //   const resultAction = dispatch(action);
    //   unwrapResult(resultAction);
    // } catch (error) {
    //   console.log("failed to login: ", error);
    // }
  };

  return (
    <>
      <div>AddProduct</div>
      <form onSubmit={handleSubmit(submitForm)}>
        <Box component={Paper} sx={{ padding: 2 }}>
          <Typography>Thông tin cơ bản</Typography>
          <TextField
            {...register("name")}
            autoComplete="off"
            fullWidth
            label="Tên sản phẩm"
            variant="outlined"
            margin="normal"
            sx={{ width: "50%", padding: 0 }}
          />

          <TextField
            {...register("description")}
            autoComplete="off"
            fullWidth
            label="Mô tả"
            variant="outlined"
            margin="normal"
            sx={{ width: "50%", padding: 0 }}
          />

          <TextField
            {...register("discount")}
            autoComplete="off"
            fullWidth
            label="Ưu đãi"
            variant="outlined"
            margin="normal"
            sx={{ width: "50%", padding: 0 }}
          />

          <TextField
            {...register("subCategories")}
            autoComplete="off"
            fullWidth
            label="Phân Loại"
            variant="outlined"
            margin="normal"
            sx={{ width: "50%", padding: 0 }}
          />

          <TextField
            {...register("Image")}
            autoComplete="off"
            fullWidth
            label="Hình Ảnh"
            variant="outlined"
            margin="normal"
            sx={{ width: "50%", padding: 0 }}
          />
          {/* <Button type="submit">Add</Button> */}
        </Box>

        <Box component={Paper} sx={{ padding: 2, mt: 2 }}>
          <Typography>Thông tin bán hàng</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography>Phân loại hàng</Typography>
            </Grid>
            <Grid item xs={8}>
              <Button
                variant="outlined"
                onClick={handleClickSubItem}
                startIcon={<AddBoxIcon />}
              >
                Thêm nhóm phân loại
              </Button>
              {subItemFormList}

              {/* <Box component={Paper}>
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
                </Box>
              */}
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={8}></Grid>
          </Grid>
        </Box>

        <Button type="submit">Thêm sản phẩm</Button>
      </form>
    </>
  );
}

export default AddProduct;
