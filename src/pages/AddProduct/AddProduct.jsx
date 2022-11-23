import React, { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import categoryApi from "~/api/categoryApi";
import "./AddProduct.scss";
import brandApi from "~/api/brandApi";
import specificationApi from "~/api/specificationApi";
import { storage } from "~/firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Swal from "sweetalert2";
import productsApi from "~/api/productsApi";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuModelProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MenuSpeciProps = {
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

  const handleCategoryDetail = async (categoryID) => {
    await categoryApi
      .getCategory(categoryID)
      .then((response) => setSubCategoryList(response.data));
  };

  const handleBrandDetail = async (brandID) => {
    await brandApi
      .getBrand(brandID)
      .then((response) => setBrandModelList(response.data));
  };

  const [inputValue, setInputValue] = useState({
    name: "",
    discount: "",
    description: "",
  });

  const handleOnChangeInputProduct = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const input = {
      ...inputValue,
      [name]: value,
    };

    setInputValue(input);
  };

  const [subCategoryID, setSubCategoryID] = useState("");
  const [value, setValue] = useState("");

  const theme = useTheme();
  const [modelSelect, setModelSelect] = useState([]);
  const [specificateSelect, setSpecificateSelect] = useState([]);
  const [specificate, setSpecificate] = useState([]);
  const [model, setModel] = useState([]);

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

  const handleSelectSpecificate = (id) => {
    const newObj = {
      specificationID: id,
      value: value,
    };
    const newArr = [...specificate, newObj];
    setSpecificate(newArr);
  };

  const handleSelectModel = (id) => {
    const newArr = [...model, id];
    setModel(newArr);
  };

  const [inputImage, setInputImage] = useState([]);

  // state of obj to push to firebase
  const [stringImg, setStringImg] = useState([]);

  // Display selected iamge
  const handleFileChange = (event) => {
    let image = [];
    let storageImage = [];
    for (let i = 0; i < event.target.files.length; i++) {
      if (
        event.target.files[i].type === "image/png" ||
        event.target.files[i].type === "image/jpeg" ||
        event.target.files[i].type === "image/jpg" ||
        event.target.files[i].type === "image/gif"
      ) {
        image.push(URL.createObjectURL(event.target.files[i]));
        storageImage.push(event.target.files[i]);
      }
    }
    setStringImg(storageImage);
    setInputImage(image);
  };

  console.log("stringImg: ", stringImg);
  // UPLOAD ANG GET IMAGE URL FROM FIREBASE
  let imagesLink = [];
  const uploadAndGetLinkImg = async () => {
    console.log("objImage: ", stringImg);
    for (let i = 0; i < stringImg.length; i++) {
      const storageRef = ref(storage, `/Product/${stringImg[i].name}`);
      // console.log(strgImg[i].name)
      await uploadBytes(storageRef, stringImg[i]);
      // get link from database to download
      await getDownloadURL(storageRef)
        .then((url) => {
          imagesLink.push(url);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    }
  };

  const [inputImageSub, setInputImageSub] = useState([]);
  // state of obj to push to firebase
  const [stringImgSub, setStringImgSub] = useState([]);

  // Display selected iamge
  const handleFileChangeSub = (event) => {
    let image = [];
    let storageImage = [];
    for (let i = 0; i < event.target.files.length; i++) {
      if (
        event.target.files[i].type === "image/png" ||
        event.target.files[i].type === "image/jpeg" ||
        event.target.files[i].type === "image/jpg" ||
        event.target.files[i].type === "image/gif"
      ) {
        image.push(URL.createObjectURL(event.target.files[i]));
        storageImage.push(event.target.files[i]);
      }
    }
    setStringImgSub(storageImage);
    setInputImageSub(image);
  };

  // UPLOAD ANG GET IMAGE URL FROM FIREBASE
  let imagesLinkSub = [];
  const uploadAndGetLinkImgSub = async () => {
    console.log("objImage: ", stringImgSub);
    for (let i = 0; i < stringImgSub.length; i++) {
      const storageRef = ref(storage, `/Subitem/${stringImgSub[i].name}`);
      // console.log(strgImg[i].name)
      await uploadBytes(storageRef, stringImgSub[i]);
      // get link from database to download
      await getDownloadURL(storageRef)
        .then((url) => {
          imagesLinkSub.push(url);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    }
  };

  const [subItemFormList, setSubItemFormList] = useState([]);
  const [inputSubItem, setInputSubItem] = useState({
    sub_ItemName: "",
    amount: 0,
    price: 0,
  });

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const input = {
      ...inputSubItem,
      [name]: value,
    };

    setInputSubItem(input);
  };

  const handleAddSubItemToDraft = () => {
    const newArr = [...subItemFormList, inputSubItem];
    setSubItemFormList(newArr);

    const newObj = {
      ...inputSubItem,
      sub_ItemName: "",
      amount: 0,
      price: 0,
    };
    setInputSubItem(newObj);
  };

  const handleDeleteDraft = (index) => {
    const newArr = [...subItemFormList];
    newArr.splice(index, 1);
    setSubItemFormList(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("add test");
    await uploadAndGetLinkImg();
    await uploadAndGetLinkImgSub();

    const newProduct = {
      Name: inputValue.name,
      Description: inputValue.description,
      Discount: inputValue.discount,
      StoreID: currentAccount.storeID,
      Sub_CategoryID: subCategoryID,
      List_Image: imagesLink,
      List_SubItem_Image: imagesLinkSub,
      List_SubItem: subItemFormList,
      List_Specitication: specificate,
      ListModel: model,
    };
    console.log(newProduct);
    // try {

    //   const response = await productsApi.addNewProduct(newProduct);
    //   console.log("newProduct: ", newProduct);
    //   Swal.fire(
    //     "New Booking successfully",
    //     "Click button to continute!",
    //     "success"
    //   );
    // } catch (error) {
    //   console.log("faild to create product: ", error);
    //   Swal.fire({
    //     icon: "error",
    //     title: "Can't add new product.",
    //     text: "Please check again.",
    //   });
    // }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
              label="Tên sản phẩm"
              autoComplete="off"
              fullWidth
              sx={{ width: "50%", padding: 0 }}
              name="name"
              value={inputValue.name}
              onChange={handleOnChangeInputProduct}
            />
          </Box>

          <Box className="line">
            <Typography width={150} color="primary" cx={{ margin: "20px" }}>
              Ưu đãi:
            </Typography>
            <TextField
              label="Ưu đãi"
              autoComplete="off"
              fullWidth
              sx={{ width: "50%", padding: 0 }}
              name="discount"
              value={inputValue.discount}
              onChange={handleOnChangeInputProduct}
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
              name="description"
              value={inputValue.description}
              onChange={handleOnChangeInputProduct}
            />
          </Box>

          <Box className="line">
            <Typography minWidth={150} color="primary" cx={{ margin: "20px" }}>
              Danh Sách Hình Ảnh:
            </Typography>
            <div className="box-img">
              <input multiple type="file" onChange={handleFileChange} />

              {inputImage.length ? (
                <Box className="line-img">
                  {inputImage.map((img, index) => (
                    <img key={index} src={img} alt="product" />
                  ))}
                </Box>
              ) : (
                <></>
              )}
            </div>
          </Box>

          <Box className="line">
            <Typography minWidth={150} color="primary" cx={{ margin: "20px" }}>
              Hình Ảnh Chi Tiết:
            </Typography>
            <div className="box-img">
              <input multiple type="file" onChange={handleFileChangeSub} />

              {inputImageSub.length ? (
                <Box className="line-img">
                  {inputImageSub.map((img, index) => (
                    <img key={index} src={img} alt="product" />
                  ))}
                </Box>
              ) : (
                <></>
              )}
            </div>
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
                  onClick={() => setSubCategoryID(subcategory.sub_CategoryID)}
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
            <Grid item xs={5}>
              <Typography color="primary">Phân loại hàng</Typography>

              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Classify</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  {subItemFormList.map((item, index) => (
                    <TableBody key={index}>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {item.sub_ItemName}
                        </TableCell>
                        <TableCell align="right">{item.amount}</TableCell>
                        <TableCell align="right">{item.price}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => handleDeleteDraft(index)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={7}>
              <Typography color="primary">Nhóm phân loại</Typography>
              <Box component={Paper} sx={{ padding: 2 }}>
                <Box>
                  <TextField
                    autoComplete="off"
                    fullWidth
                    label="Phân loại hàng"
                    variant="outlined"
                    margin="normal"
                    sx={{ width: "49%", marginRight: "1%" }}
                    name="sub_ItemName"
                    value={inputSubItem.sub_ItemName}
                    onChange={handleOnChange}
                  />
                  <TextField
                    type="number"
                    autoComplete="off"
                    fullWidth
                    label="Số lượng"
                    variant="outlined"
                    margin="normal"
                    sx={{ width: "50%", padding: 0 }}
                    name="amount"
                    value={inputSubItem.amount}
                    onChange={handleOnChange}
                  />
                  <TextField
                    type="number"
                    autoComplete="off"
                    fullWidth
                    label="Đơn giá"
                    variant="outlined"
                    margin="normal"
                    sx={{ width: "49%", marginRight: "1%" }}
                    name="price"
                    value={inputSubItem.price}
                    onChange={handleOnChange}
                  />
                </Box>
                <Button
                  variant="outlined"
                  onClick={handleAddSubItemToDraft}
                  startIcon={<AddBoxIcon />}
                >
                  Thêm nhóm phân loại
                </Button>
              </Box>
            </Grid>
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
              List Brand:
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
              List Model:
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
                MenuProps={MenuModelProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <em>Placeholder</em>
                </MenuItem>
                {brandModelList.map((model) => (
                  <MenuItem
                    key={model.brand_ModelID}
                    value={model.name}
                    onClick={() => handleSelectModel(model.brand_ModelID)}
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
              Specificate:
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
                MenuProps={MenuSpeciProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <em>Placeholder</em>
                </MenuItem>
                {specificationList.map((item) => (
                  <MenuItem
                    key={item.specificationID}
                    value={item.specificationName}
                    onClick={() =>
                      handleSelectSpecificate(item.specificationID)
                    }
                    style={getStyles(item, specificateSelect, theme)}
                  >
                    {item.specificationName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className="line">
            <Typography width={180} color="primary" cx={{ margin: "20px" }}>
              Value:
            </Typography>
            <TextField
              label="Value"
              autoComplete="off"
              fullWidth
              sx={{ width: "50%", padding: 0 }}
              name="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
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
