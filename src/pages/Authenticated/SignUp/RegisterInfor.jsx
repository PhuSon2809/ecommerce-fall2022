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
import InputLabel from "@mui/material/InputLabel";
import Maplocation from "./map";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";

RegisterInfor.propTypes = {};

function RegisterInfor(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");

  const [open, setOpen] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [address, setAddress] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [long, setLong] = useState("");
  const [latitude, setLat] = useState("");

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
  const handlechangeAddresses = (e) => {
    let inputadd = e.target.value == null ? address : e.target.value;
    setAddress(inputadd);
    console.log("value", inputadd);
  };

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

  return (
    <div className="formContainer_Infor">
      <div className="formContainer_input">
        <h3 className="formTitle" color="primary">
          Đăng ký thông tin người dùng
        </h3>
        <div className="form_input">
          <Typography width={250} color="primary" cx={{ margin: "10px" }}>
            Tên người dùng
          </Typography>
          <TextField
            required
            alt="avatar"
            sx={{ position: "static !important", mr: 2, width: "300px" }}
          ></TextField>
        </div>
        <div className="form_input">
          <Typography width={250} color="primary" cx={{ margin: "10px" }}>
            Email
          </Typography>
          <TextField
            required
            alt="avatar"
            sx={{ position: "static !important", mr: 2, width: "300px" }}
          ></TextField>
        </div>

        <div className="form_input">
          <Typography width={250} color="primary" cx={{ margin: "10px" }}>
            Số điện thoại
          </Typography>
          <TextField
            required
            value={props.usercurrent}
            disabled
            alt="avatar"
            sx={{ position: "static !important", mr: 2, width: "300px" }}
          ></TextField>
        </div>

        <div className="form_input">
          <Typography width={250} color="primary" cx={{ margin: "10px" }}>
            Địa chỉ
          </Typography>

          {/* <Button variant="outlined" onClick={handleOpenMap}>
        Open alert dialog
      </Button> */}

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
          <div className= "location_button">
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
        </div>

        <div className="form_input">
          <Typography width={250} color="primary" cx={{ margin: "10px" }}>
            Ngày sinh
          </Typography>
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
        </div>

        <div className="form_input">
          <Typography width={250} color="primary" cx={{ margin: "10px" }}>
            Giới tính
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl style={{ width: "35vh", marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Giới tính"
                // onChange={handleChange}
              >
                <MenuItem value={"Nam"}>Nam</MenuItem>
                <MenuItem value={"Nữ"}>Nữ</MenuItem>
                <MenuItem value={"Khác"}>Khác</MenuItem>
              </Select>
            </FormControl>
          </Box>

          
        </div>
        <Button style={{marginTop: "20px"}} className="btn_register" variant="contained">Đăng ký</Button>
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
    </div>
  );
}

export default RegisterInfor;
