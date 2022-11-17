import React, { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import categoryApi from "~/api/categoryApi";
import "./AddProduct.scss";
import brandApi from "~/api/brandApi";
import specificationApi from "~/api/specificationApi";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(model, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(model) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function AddProduct() {
  const currentAccount = useSelector((state) => state.account.current);

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

  const theme = useTheme();
  const [modelSelect, setModelSelect] = React.useState([]);
  const [specificateSelect, setSpecificateSelect] = React.useState([]);

  const handleChangeSelectModel = (event) => {
    const {
      target: { value },
    } = event;
    setModelSelect(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeSelectSpecificate = (event) => {
    const {
      target: { value },
    } = event;
    setSpecificateSelect(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [brandModelList, setBrandModelList] = useState([]);
  const [specificationList, setSpecificationList] = useState([]);

  const fetchData = async () => {
    await categoryApi
      .getListCategory()
      .then((response) => setCategoryList(response.data));
    await brandApi
      .getListBrands()
      .then((response) => setBrandList(response.data));
    await specificationApi
      .getListSpecification()
      .then((response) => setSpecificationList(response.data));
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);

  const handleClose = (index) => {
    console.log(subItemFormList);
    subItemFormList.slice();
    // subItemFormList.remove()
  };

  const handleClickSubItem = (event) => {
    // setIsSubItem(!isSubItem);
    setSubItemFormList(
      subItemFormList.concat(
        <Box
          component={Paper}
          key={subItemFormList.length}
          subItemFormList={subItemFormList}
          sx={{ padding: 2 }}
        >
          <Typography>Nhóm phân loại</Typography>
          <TextField
            {...register("list_SubItem").subItem}
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

  const handleCategoryDetail = async (categoryID) => {
    console.log(categoryID);
    await categoryApi
      .getCategory(categoryID)
      .then((response) => setSubCategoryList(response.data));
  };

  const handleBrandDetail = async (brandID) => {
    console.log(brandID);
    await brandApi
      .getBrand(brandID)
      .then((response) => setBrandModelList(response.data));
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
      <form onSubmit={handleSubmit(submitForm)}>
        <Box
          component={Paper}
          sx={{
            padding: 2,
            display: "flex",
            gap: "15px",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" color="primary">
            Thông tin cơ bản
          </Typography>
          <Box className="line">
            <Typography width={150} color="primary" cx={{ margin: "20px" }}>
              Tên sản phẩm:
            </Typography>
            <TextField
              {...register("name")}
              label="Tên sản phẩm"
              autoComplete="off"
              fullWidth
              sx={{ width: "50%", padding: 0 }}
            />
          </Box>

          <Box className="line">
            <Typography width={150} color="primary" cx={{ margin: "20px" }}>
              Ưu đãi:
            </Typography>
            <TextField
              {...register("name")}
              label="Ưu đãi"
              autoComplete="off"
              fullWidth
              sx={{ width: "50%", padding: 0 }}
            />
          </Box>

          <Box className="line">
            <Typography width={150} color="primary" cx={{ margin: "20px" }}>
              Mô tả:
            </Typography>
            <TextField
              id="outlined-multiline-static"
              autoComplete="off"
              label="Mô tả"
              multiline
              rows={4}
              sx={{ width: "50%", padding: 0 }}
            />
          </Box>

          <Box className="line">
            <Typography width={150} color="primary" cx={{ margin: "20px" }}>
              Hình Ảnh:
            </Typography>
            <TextField
              {...register("Image")}
              type="file"
              multiple
              autoComplete="off"
              fullWidth
              sx={{ width: "50%", padding: 0 }}
            />
          </Box>

          <Box className="line">
            <Typography width={150} color="primary" cx={{ margin: "20px" }}>
              Phân loại:
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ width: "50%", padding: 0 }}
            >
              {categoryList.map((category, index) => (
                <MenuItem
                  key={index}
                  value={category.categoryID}
                  onClick={() => handleCategoryDetail(category.categoryID)}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box className="line">
            <Typography width={150} color="primary" cx={{ margin: "20px" }}>
              Phân loại chi tiết:
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ width: "50%", padding: 0 }}
            >
              {subCategoryList.map((subcategory) => (
                <MenuItem
                  key={subcategory.sub_CategoryID}
                  value={subcategory.sub_CategoryID}
                >
                  {subcategory.sub_categoryName}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box component={Paper} sx={{ padding: 2, mt: 2 }}>
          <Typography variant="h6" color="primary">
            Thông tin bán hàng
          </Typography>
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
            </Grid>
            {/* <Grid item xs={4}></Grid>
            <Grid item xs={8}></Grid> */}
          </Grid>
        </Box>

        <Box
          component={Paper}
          sx={{
            padding: 2,
            marginTop: 3,
            display: "flex",
            gap: "15px",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" color="primary">
            Thông số cơ bản
          </Typography>

          <Box className="line">
            <Typography width={180} color="primary" cx={{ margin: "20px" }}>
              Danh sách thông số:
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ width: "50%", padding: 0 }}
            >
              {brandList.map((brand) => (
                <MenuItem
                  key={brand.brandID}
                  value={brand.brandID}
                  onClick={() => handleBrandDetail(brand.brandID)}
                >
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box className="line">
            <Typography width={180} color="primary" cx={{ margin: "20px" }}>
              Thông số kỹ thuật:
            </Typography>
            <FormControl sx={{ width: "50%", padding: 0 }}>
              <Select
                multiple
                displayEmpty
                value={modelSelect}
                onChange={handleChangeSelectModel}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Placeholder</em>;
                  }

                  return selected.join(", ");
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <em>Placeholder</em>
                </MenuItem>
                {brandModelList.map((model) => (
                  <MenuItem
                    key={model.brand_ModelID}
                    value={model.name}
                    style={getStyles(model, modelSelect, theme)}
                  >
                    {model.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box className="line">
            <Typography width={180} color="primary" cx={{ margin: "20px" }}>
              Model:
            </Typography>
            <FormControl sx={{ width: "50%", padding: 0 }}>
              <Select
                multiple
                displayEmpty
                value={specificateSelect}
                onChange={handleChangeSelectSpecificate}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Placeholder</em>;
                  }

                  return selected.join(", ");
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <em>Placeholder</em>
                </MenuItem>
                {specificationList.map((item) => (
                  <MenuItem
                    key={item.specificationID}
                    value={item.specificationName}
                    style={getStyles(item, specificateSelect, theme)}
                  >
                    {item.specificationName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Button type="submit" variant="outlined" sx={{ m: "20px auto" }}>
          Thêm sản phẩm
        </Button>
      </form>
    </>
  );
}

export default AddProduct;
