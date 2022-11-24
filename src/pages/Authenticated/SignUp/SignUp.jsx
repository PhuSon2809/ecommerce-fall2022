import React, { useState, useEffect } from "react";
import { auth } from "~/firebase/firebaseConfig";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import StorageKeys from "~/constants/storage-keys";
import axios from "axios";
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
import InputAdornment from "@mui/material/InputAdornment";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import "../Login/login.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Maplocation from "./map";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Checkbox from '@mui/material/Checkbox';

function SignUp(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");
  const [checkNumber, setCheckNumber] = useState();
  const [usercurrent, setCurrent] = useState([]);
  const [open, setOpen] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [openStore, setOpenStore] = useState(false);
  const [long, setLong] = useState("");
  const [latitude, setLat] = useState("");
  const [address, setAddress] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [context, setContext] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [userAPI, setUserAPI] = useState([]);

  const [StoreName, setStoreName] = useState("");
  const [StoreEmail, setStoreEmail] = useState("");
  const [StorePhone, setStorePhone] = useState("");
  const [StoreDate, setStoreDate] = useState("");
  const [StoreImg, setStoreImg] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);

  const [checked, setChecked] = useState(false);

console.log("userAPI", userAPI.userID)

const OpenLogin = () =>{
  setOpenLogin(true);
}
const handleCheck = (event) => {
  setChecked(event.target.checked);
};
  const handleChangeStoreName = (e) => {
    setStoreName(e.target.value);
  };
  const handleChangeStoreEmail = (e) => {
    setStoreEmail(e.target.value);
  };
  const handleChangeStorePhone = (e) => {
    setStorePhone(e.target.value);
  };
  const handleChangeStoreDate = (e) => {
    setStoreDate(e.target.value);
  };
  const handleOnChangeFile = (event) => {
    setStoreImg(event.target.files[0]);
  };

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };
  const handleChangecontext = (e) => {
    setContext(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenMap = () => {
    setOpenMap(true);
  };
  const handleCloseMap = () => {
    setOpenMap(false);
  };
  const handleOpenStore = () => {
    setOpenStore(true);
  };
  const handleCloseStore = () => {
    setOpenStore(false);
  };

  const handlechangeAddresses = (e) => {
    let inputadd = e.target.value == null ? address : e.target.value;
    setAddress(inputadd);
    console.log("value", inputadd);
  };
  const countryCode = "+84";
  const handleChangeNumber = (e) => {
    let phoneNumber = e.target.value;
    if (phoneNumber.startsWith("0")) {
      setPhoneNumber(countryCode + phoneNumber.slice(1));
    } else {
      setPhoneNumber(countryCode + phoneNumber);
    }
    console.log("e.target.value", countryCode + phoneNumber.slice(1));
  };

  const handleChangeOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          handleOpen();

          // User signed in successfully.
          const user = result.user;
          setCurrent(user);

          // await axios
          //   .post(
          //     `http://esmpfree-001-site1.etempurl.com/api/user/suppliersign_in`,
          //     bodyParameters,
          //     {
          //       headers: {
          //         Authorization: `Bearer ${user.accessToken}`,
          //       },
          //     }
          //   )
          //   .then((response) => {
          //     setCurrent(response.data);
          //     window.location.reload(false);
          //     localStorage.setItem(StorageKeys.TOKEN, response.data.token);
          //     localStorage.setItem(
          //       StorageKeys.ACCOUNT,
          //       JSON.stringify(response.data)
          //     );
          //     console.log("response.data", response.data);
          //   });
          // console.log(user);
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          alert("s User couldn't sign in");
        });
    }
  };
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };
  const checkPhoneNumber = async () => {
    await axios
      .post(
        `http://esmpfree-001-site1.etempurl.com/api/user/check_user?phone=${phoneNumber.slice(
          1
        )}`
      )
      .then((response) => {
        setCheckNumber(response.success);
        console.log("response", response.success);
        console.log("check", checkNumber);

        response.success === false ? requestOTP() : alert("số đã đăng ký");
      });
  };

  const bodyParameters = {
    phone: phoneNumber.slice(1),
    fcM_Firebase: phoneNumber,
  };
  const requestOTP = (e) => {
    setExpandForm(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then(async (confirmationResult) => {
        window.confirmationResult = confirmationResult;
        // alert("sent");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("err", error);
      });
  };

  //   const getLocation = () => {
  //     const ifameData=document.getElementById("iframeId")
  //   const lat=latitude;
  //   const lon=long;
  //   ifameData.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
  //   }

  const findMyState = () => {
    const status = document.querySelector(".status");
    const success = (position) => {
      console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log("latitude", latitude);
      console.log("longitude", longitude);
      console.log("address", address);
      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
      fetch(geoApiUrl)
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          // status.textContent = data.principalSubdivision;
          setLong(data.longitude);
          setLat(data.latitude);
          setAddress(
            data.principalSubdivision +
              ", " +
              data.locality +
              ", " +
              data.localityInfo.administrative[3].name
          );
          setDistrict(data.localityInfo.administrative[3].name);
          setWard(data.locality);
          setProvince(data.principalSubdivision);
          console.log(
            "TP",
            data.principalSubdivision +
              data.locality +
              data.localityInfo.administrative[3].name
          );
          console.log("phường", data.locality);
          console.log("quận", data.localityInfo.administrative[3].name);
        });
    };

    const error = () => {
      status.textContent = "unable to find-state";
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  const handleSubmitRegister = () => {
    try {
      const formRegister = {
        userName: userName,
        email: email,
        phone: phoneNumber.slice(1),
        imageName: "default",
        imagepath:
          "https://firebasestorage.googleapis.com/v0/b/esmp-4b85e.appspot.com/o/images%2F16-1c8843e5-4dd0-4fb7-b061-3a9fcbd68c0d?alt=media&token=0c8838a5-d3c4-4c31-82ed-d9b91d8c11d9",
        contextAddress: context,
        dateOfBirth: birthday,
        gender: gender,
        latitude: latitude,
        longitude: long,
        province: province,
        district: district,
        ward: ward,
        firebaseID: usercurrent.uid,
        fcM_Firebase: "string",
      };
      console.log("form regis", formRegister);

      const bodyParameters = {
        phone: phoneNumber.slice(1),
        fcM_Firebase: phoneNumber,
      };

      axios
        .post(
          `http://esmpfree-001-site1.etempurl.com/api/user/supplier_register`,
          formRegister
        )
        .then((response) => {
          setUserAPI(response.data);

          localStorage.setItem(
            StorageKeys.ACCOUNT,
            JSON.stringify(response.data),
            response.data.storeID == "-1"
              ? handleOpenStore()
              : alert("cos store")
          );
          console.log("response.data", response.data);
        });
    } catch (error) {
      console.log("fail to update: ", error);
    }
  };

  const handleSubmitRegisterStore = () => {
    try {
      const formRegisterStore = {
        StoreName: StoreName,
        Email: StoreEmail,
        Phone: StorePhone,
        UserID: userAPI.userID,
        File: StoreImg,
        Pick_date: StoreDate,
        contextAddress: context,
        Province: province,
        District: district,
        Ward: ward,
        latitude: latitude,
        longitude: long,

      };
      console.log("form regis", formRegisterStore);

      const bodyParameters = {
        phone: phoneNumber.slice(1),
        fcM_Firebase: phoneNumber,
      };
      
      console.log("regis store", formRegisterStore);
      axios({
        method: "POST",
        data:  formRegisterStore,
        url: "http://esmpfree-001-site1.etempurl.com/api/Store/register",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          OpenLogin()
        });
    } catch (error) {
      console.log("fail to update: ", error);
    }
  }

  return (
    <>
      <div className="formContainer">
        {/* <img className = "img_left" src="https://plexcollectionposters.com/images/2021/05/16/background-images-for-login-page3bc68c53b0db224b.jpg"/> */}
        <Box
          component="form"
          sx={{
            width: 400,
            height: 400,
          }}
          class="formLogin"
        >
          <h3 className="formTitle" color="primary">
            Đăng ký tài khoản
          </h3>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              onChange={handleChangeNumber}
              label="Nhập số điện thoại"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+84</InputAdornment>
                ),
              }}
            />
          </Box>
          {expandForm === true ? (
            <>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  onChange={handleChangeOTP}
                  label="Nhập mã OTP"
                  id="outlined-start-adornment"
                  required
                  sx={{ m: 1, width: "25ch" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Mã OTP</InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Link to={"/login"}>
                <Button variant="text">Đăng nhập tài khoản hiện có</Button>
              </Link>
            </>
          ) : null}
          {expandForm === false ? (
            <>
              <Button
                onClick={checkPhoneNumber}
                variant="contained"
                style={{ margin: "10px" }}
              >
                {" "}
                Nhận mã OTP
              </Button>
              <Link to={"/login"}>
                <Button variant="text">Đăng nhập tài khoản hiện có</Button>
              </Link>
            </>
          ) : null}
          <div id="recaptcha-container"></div>
        </Box>
      </div>
      <Dialog open={open}>
        <DialogTitle
          sx={{
            textAlign: "center",
            borderBottom: "1px solid #d3d3d3",
          }}
        >
          Nhập thông tin người dùng
        </DialogTitle>
        <DialogContent
          sx={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
            height: "400vh",
            padding: "60px",
          }}
        >
          <Typography width={250} color="primary" cx={{ margin: "10px" }}>
            Tên người dùng
          </Typography>
          <TextField
            onChange={handleChangeUserName}
            required
            alt="avatar"
            sx={{ position: "static !important", mr: 2, width: "300px" }}
          ></TextField>
          <Typography width={250} color="primary" cx={{ margin: "10px" }}>
            Email
          </Typography>
          <TextField
            onChange={handleChangeEmail}
            required
            alt="avatar"
            sx={{ position: "static !important", mr: 2, width: "300px" }}
          ></TextField>
          <Typography width={250} color="primary" cx={{ margin: "10px" }}>
            Số điện thoại
          </Typography>
          <TextField
            required
            value={phoneNumber}
            disabled
            alt="avatar"
            sx={{ position: "static !important", mr: 2, width: "300px" }}
          ></TextField>
          <Typography width={250} color="primary" cx={{ margin: "10px" }}>
            Địa chỉ
          </Typography>
          <button onClick={findMyState}>Find</button>

          <Button variant="outlined" onClick={handleOpenMap}>
            Open alert dialog
          </Button>
          <TextField
            value={context}
            onChange={handleChangecontext}
            required
            alt="avatar"
            sx={{
              position: "static !important",
              mr: 2,
              width: "300px",
              marginBottom: "20px",
            }}
          ></TextField>

          <TextField
            value={address}
            onChange={handlechangeAddresses}
            required
            alt="avatar"
            sx={{
              position: "static !important",
              mr: 2,
              width: "300px",
              marginBottom: "20px",
            }}
          ></TextField>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              inputFormat="DD-MM-YYYY"
              disableFuture
              label="Từ ngày"
              value={birthday}
              onChange={(newValue) => {
                setBirthday(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Box sx={{ minWidth: 120 }}>
            <FormControl style={{ width: "35vh", marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Giới tính"
                onChange={handleChangeGender}
              >
                <MenuItem value={"Nam"}>Nam</MenuItem>
                <MenuItem value={"Nữ"}>Nữ</MenuItem>
                <MenuItem value={"Khác"}>Khác</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmitRegister}>Ok</Button>
        </DialogActions>
      </Dialog>
      <div>
        <Dialog
          open={openMap}
          onClose={handleCloseMap}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent style={{ width: "75vh", height: "900px" }}>
            <Maplocation />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMap}>Disagree</Button>
            <Button onClick={handleCloseMap} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      //--------------------------------------------------------------------------------
      <Dialog open={openStore}>
        <DialogTitle
          sx={{
            textAlign: "center",
            borderBottom: "1px solid #d3d3d3",
          }}
        >
          Đăng ký cửa hàng
        </DialogTitle>
        <DialogContent
          sx={{
            // marginTop: "10px",
            // display: "flex",
            // flexDirection: "column",
            // alignItems: "center",
            // justifyContent: "space-around",
            width: "500px",
            height: "400vh",
            padding: "60px",
          }}
        >
          <Typography width={250} color="primary" cx={{ margin: "10px" }}>
            Tên cửa hàng
          </Typography>
          <TextField
            onChange={handleChangeStoreName}
            required
            alt="avatar"
            sx={{ position: "static !important", mr: 2, width: "300px" }}
          ></TextField>
          <Typography width={250} color="primary" cx={{ margin: "10px" }}>
            Email
          </Typography>
          <TextField
            onChange={handleChangeStoreEmail}
            required
            alt="avatar"
            sx={{ position: "static !important", mr: 2, width: "300px" }}
          ></TextField>
          <Typography width={250} color="primary" cx={{ margin: "10px" }}>
            Số điện thoại
          </Typography>
          <TextField
            onChange={handleChangeStorePhone}
            required
            alt="avatar"
            sx={{ position: "static !important", mr: 2, width: "300px" }}
          ></TextField>

          <Typography width={250} color="primary" cx={{ margin: "10px" }}>
            Hình ảnh
          </Typography>
          <TextField
            onChange={handleOnChangeFile}
            required
            type="file"
            alt="avatar"
            sx={{ position: "static !important", mr: 2, width: "300px" }}
          ></TextField>

          <Typography width={250} color="primary" cx={{ margin: "10px" }}>
            Ngày lấy hàng
          </Typography>
          <TextField
            onChange={handleChangeStoreDate}
            required
            alt="avatar"
            sx={{ position: "static !important", mr: 2, width: "300px" }}
          ></TextField>

          <Typography width={250} color="primary" cx={{ margin: "10px" }}>
            Địa chỉ
          </Typography>
          {/* <button onClick={findMyState}>Find</button>

          <Button variant="outlined" onClick={handleOpenMap}>
            Open alert dialog
          </Button> */}
          <div className="location_button">
            <IconButton
              onClick={handleOpenMap}
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={findMyState}
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <LocationOnIcon />
            </IconButton>
          </div>
          <TextField
            value={context}
            onChange={handleChangecontext}
            required
            alt="avatar"
            sx={{
              position: "static !important",
              mr: 2,
              width: "300px",
              marginBottom: "20px",
            }}
          ></TextField>

          <TextField
            value={address}
            onChange={handlechangeAddresses}
            required
            alt="avatar"
            sx={{
              position: "static !important",
              mr: 2,
              width: "300px",
              marginBottom: "20px",
            }}
          ></TextField>
<Link >
            Điều khoản sử dụng
          </Link>
          <Checkbox
      checked={checked}
      onChange={handleCheck}
      inputProps={{ 'aria-label': 'controlled' }}
    />
        </DialogContent>

        <DialogActions>
          <Button color="inherit" onClick={handleCloseStore}>
            Cancel
          </Button> {
            checked ? <Button onClick={handleSubmitRegisterStore}>Ok</Button> : <Button disabled onClick={handleSubmitRegisterStore}>Ok</Button>

          }
          
          
        </DialogActions>
      </Dialog>
 
      //----------------------------------------------------------------
      <Dialog open={openLogin}>
        <DialogTitle
          sx={{
            textAlign: "center",
            borderBottom: "1px solid #d3d3d3",
          }}
        >
          Đăng nhập tài khoản
        </DialogTitle>
        <DialogContent>
 <Link to={"/login"}>
<Button>đăng nhập</Button>
 </Link>
        </DialogContent>

       
      </Dialog>
    </>
  );
}

export default SignUp;
