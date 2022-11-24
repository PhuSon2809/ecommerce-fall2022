// import React, { useState, useEffect } from "react";
// import { auth } from "~/firebase/firebaseConfig";
// import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
// import StorageKeys from "~/constants/storage-keys";
// import axios from "axios";
// import {
//   Button,
//   FormControl,
//   Grid,
//   MenuItem,
//   OutlinedInput,
//   Paper,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import InputAdornment from "@mui/material/InputAdornment";
// import { Link } from "react-router-dom";
// import Box from "@mui/material/Box";
// import "./login.scss";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import {
//   Dialog,
//   DialogTitle,
//   DialogActions,
//   DialogContent,
// } from "@mui/material";
// import InputLabel from '@mui/material/InputLabel';
// import Maplocation from './map.js'

// function Login(props) {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [expandForm, setExpandForm] = useState(false);
//   const [OTP, setOTP] = useState("");
//   const [checkNumber, setCheckNumber] = useState();
//   const [usercurrent, setCurrent] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [openMap, setOpenMap] = useState(false);
//   const [long, setLong] = useState("");
//   const [latitude, setLat] = useState("");
//   const [address, setAddress] = useState(null);
//   const [birthday, setBirthday] = useState(null);


//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleOpenMap = () =>{
//     setOpenMap(true);
//   }
//  const handleCloseMap = () =>{
//     setOpenMap(false);
//   }

  
// const handlechangeAddresses = (e) => {
//   let inputadd = (e.target.value) ==  null ? address : e.target.value
//   setAddress(inputadd)
//   console.log("value", inputadd)
// }
//   const countryCode = "+84";
//   const handleChangeNumber = (e) => {
//     let phoneNumber = e.target.value;
//     if (phoneNumber.startsWith("0")) {
//       setPhoneNumber(countryCode + phoneNumber.slice(1));
//     } else {
//       setPhoneNumber(countryCode + phoneNumber);
//     }
//     console.log("e.target.value", countryCode + phoneNumber.slice(1));
//   };

//   const handleChangeOTP = (e) => {
//     let otp = e.target.value;
//     setOTP(otp);
//     if (otp.length === 6) {
//       let confirmationResult = window.confirmationResult;
//       confirmationResult
//         .confirm(otp)
//         .then((result) => {
//           handleOpen();

//           // User signed in successfully.
//           const user = result.user;
//           // await axios
//           //   .post(
//           //     `http://esmpfree-001-site1.etempurl.com/api/user/suppliersign_in`,
//           //     bodyParameters,
//           //     {
//           //       headers: {
//           //         Authorization: `Bearer ${user.accessToken}`,
//           //       },
//           //     }
//           //   )
//           //   .then((response) => {
//           //     setCurrent(response.data);
//           //     window.location.reload(false);
//           //     localStorage.setItem(StorageKeys.TOKEN, response.data.token);
//           //     localStorage.setItem(
//           //       StorageKeys.ACCOUNT,
//           //       JSON.stringify(response.data)
//           //     );
//           //     console.log("response.data", response.data);
//           //   });
//           // console.log(user);
//           // ...
//         })
//         .catch((error) => {
//           // User couldn't sign in (bad verification code?)
//           // ...
//           alert("s User couldn't sign in");
//         });
//     }
//   };
//   const generateRecaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       "recaptcha-container",
//       {
//         size: "invisible",
//         callback: (response) => {
//           // reCAPTCHA solved, allow signInWithPhoneNumber.
//         },
//       },
//       auth
//     );
//   };
//   const checkPhoneNumber = async () => {
//     await axios
//       .post(
//         `http://esmpfree-001-site1.etempurl.com/api/user/check_user?phone=${phoneNumber.slice(
//           1
//         )}`
//       )
//       .then((response) => {
//         setCheckNumber(response.success);
//         console.log("response", response.success);
//         console.log("check", checkNumber);

//         response.success === true ? requestOTP() : alert("sai so");
//       });
//   };

//   const bodyParameters = {
//     phone: phoneNumber.slice(1),
//     fcM_Firebase: phoneNumber,
//   };
//   const requestOTP = (e) => {
//     setExpandForm(true);
//     generateRecaptcha();
//     let appVerifier = window.recaptchaVerifier;
//     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//       .then(async (confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         // alert("sent");
//         // ...
//       })
//       .catch((error) => {
//         // Error; SMS not sent
//         // ...
//         console.log("err", error);
//       });
//   };

// //   const getLocation = () => {
// //     const ifameData=document.getElementById("iframeId")
// //   const lat=latitude;
// //   const lon=long;
// //   ifameData.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
// //   }


//   const findMyState = () => {

//     const status = document.querySelector('.status');
//     const success = (position) => {
//         console.log(position)
//         const latitude = position.coords.latitude;
//         const longitude= position.coords.longitude;
//         console.log("latitude", latitude)
//         console.log("longitude", longitude)
//         console.log("address", address);
//         const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
//         fetch(geoApiUrl).then(res => res.json()).then(data => {
//           console.log("data", data)
//           // status.textContent = data.principalSubdivision;
//           setLong(data.longitude);
//           setLat(data.latitude);
//           setAddress(data.principalSubdivision +", " + data.locality +", " + data.localityInfo.administrative[3].name) 
//           console.log("TP", data.principalSubdivision + data.locality + data.localityInfo.administrative[3].name)
//           console.log("phường", data.locality)
//           console.log("quận", data.localityInfo.administrative[3].name)
          
//         })

//     }

//     const error = () => {
//         status.textContent = 'unable to find-state'
//     }

//     navigator.geolocation.getCurrentPosition(success, error);

// }


//   return (
//     <>

//       <div className="formContainer">
//         {/* <img className = "img_left" src="https://plexcollectionposters.com/images/2021/05/16/background-images-for-login-page3bc68c53b0db224b.jpg"/> */}
//         <Box
//           component="form"
//           sx={{
//             width: 400,
//             height: 400,
//           }}
//           class="formLogin"
//         >
//           <h3 className="formTitle" color="primary">
//             Đăng ký tài khoản
//           </h3>
//           <Box
//             component="form"
//             sx={{
//               "& > :not(style)": { m: 1, width: "25ch" },
//             }}
//             noValidate
//             autoComplete="off"
//           >
//             <TextField
//               onChange={handleChangeNumber}
//               label="Nhập số điện thoại"
//               id="outlined-start-adornment"
//               sx={{ m: 1, width: "25ch" }}
//               required
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">+84</InputAdornment>
//                 ),
//               }}
//             />
//           </Box>
//           {expandForm === true ? (
//             <>
//               <Box
//                 component="form"
//                 sx={{
//                   "& > :not(style)": { m: 1, width: "25ch" },
//                 }}
//                 noValidate
//                 autoComplete="off"
//               >
//                 <TextField
//                   onChange={handleChangeOTP}
//                   label="Nhập mã OTP"
//                   id="outlined-start-adornment"
//                   required
//                   sx={{ m: 1, width: "25ch" }}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">Mã OTP</InputAdornment>
//                     ),
//                   }}
//                 />
//               </Box>
//               <Link to={"/signup"}>
//                 <Button variant="text">Đăng ký tài khoản</Button>
//               </Link>
//             </>
//           ) : null}
//           {expandForm === false ? (
//             <>
//               <Button
//                 onClick={checkPhoneNumber}
//                 variant="contained"
//                 style={{ margin: "10px" }}
//               >
//                 {" "}
//                 Nhận mã OTP
//               </Button>
//               <Link to={"/signup"}>
//                 <Button variant="text">Đăng ký tài khoản</Button>
//               </Link>
//             </>
//           ) : null}
//           <div id="recaptcha-container"></div>
//         </Box>
//       </div>

//       <Dialog open={open}>
//         <DialogTitle
//           sx={{
//             textAlign: "center",
//             borderBottom: "1px solid #d3d3d3",
//           }}
//         >
//           Nhập thông tin người dùng
//         </DialogTitle>
//         <DialogContent
//           sx={{
//             marginTop: "10px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "space-around",
//             width: "100%",
//             height: "400vh",
//            padding: "60px"
//           }}
//         >

//           <Typography width={250} color="primary" cx={{ margin: "10px" }}>
//             Tên người dùng
//           </Typography>
//           <TextField
//             required
//             alt="avatar"
//             sx={{ position: "static !important", mr: 2, width: "300px" }}
//           ></TextField>
//           <Typography width={250} color="primary" cx={{ margin: "10px" }}>
//             Email
//           </Typography>
//           <TextField
//             required
//             alt="avatar"
//             sx={{ position: "static !important", mr: 2, width: "300px" }}
//           ></TextField>
//           <Typography width={250} color="primary" cx={{ margin: "10px" }}>
//             Số điện thoại
//           </Typography>
//           <TextField
//             required
//             value={phoneNumber}
//             disabled
//             alt="avatar"
//             sx={{ position: "static !important", mr: 2, width: "300px" }}
//           ></TextField>
//            <Typography width={250} color="primary" cx={{ margin: "10px" }}>
//             Địa chỉ
//           </Typography>
//           <button onClick={findMyState}>Find</button>
        
         
        
//           <Button variant="outlined" onClick={handleOpenMap}>
//         Open alert dialog
//       </Button>
 
            
//           <div>
//               {/* <button onClick={handleCloseMap}>Close map</button> */}
//             {/* <iframe id="iframeId" height="500px" width="100%"></iframe> */}
//             {/* <GoogleMapLocation/> */}

           
//         </div>
        
         
//           <TextField
//           value={address}
//           onChange={handlechangeAddresses}
//             required
//             alt="avatar"
//             sx={{ position: "static !important", mr: 2, width: "300px", marginBottom: "20px" }}
//           ></TextField>

//           <LocalizationProvider  dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 inputFormat="DD-MM-YYYY"
//                 disableFuture
//                 label="Từ ngày"
                
//                 value={birthday}
//                 onChange={(newValue) => {
//                   setBirthday(newValue);
//                 }}
//                 renderInput={(params) => <TextField {...params} />}
//               />
//             </LocalizationProvider>          
//           <Box sx={{ minWidth: 120 }}>
//       <FormControl style={{width : "35vh", marginTop: "20px"}}>
//         <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           // value={age}
//           label="Giới tính"
//           // onChange={handleChange}
//         >
//           <MenuItem value={"Nam"}>Nam</MenuItem>
//           <MenuItem value={"Nữ"}>Nữ</MenuItem>
//           <MenuItem value={"Khác"}>Khác</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
         
//         </DialogContent>

//         <DialogActions>
//           <Button color="inherit" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleClose}>Ok</Button>
//         </DialogActions>
//       </Dialog>

//       <div>
      
//       <Dialog 
//         open={openMap}
//         onClose={handleCloseMap}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
      
//       >
//         <DialogContent   style={{width: '75vh', height: '900px'}}>
//         <Maplocation  />
        
//         </DialogContent >
//         <DialogActions>
//           <Button onClick={handleCloseMap}>Disagree</Button>
//           <Button onClick={handleCloseMap} autoFocus>
//             Agree
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//     </>
//   );
// }

// export default Login;

import React, { useState } from "react";
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
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import "./login.scss";
import SignUp from "../SignUp/SignUp";

function Login(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");
  const [checkNumber, setCheckNumber] = useState();
  const [usercurrent, setCurrent] = useState([]);

  

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
        .then(async (result) => {
          // User signed in successfully.
          const user = result.user;
          await axios
            .post(
              `http://esmpfree-001-site1.etempurl.com/api/user/suppliersign_in`,
              bodyParameters,
              {
                headers: {
                  Authorization: `Bearer ${user.accessToken}`,
                },
              }
            )
            .then((response) => {
              setCurrent(response.data);
              window.location.reload(false);
              localStorage.setItem(StorageKeys.TOKEN, response.data.token);
              localStorage.setItem(
                StorageKeys.ACCOUNT,
                JSON.stringify(response.data)
              );
              console.log("response.data", response.data);
            });
          console.log(user);
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

        response.success === true ? requestOTP() : alert("sai so");
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
            Đăng Nhập
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
              <Link to={"/signup"}>
                <Button variant="text">Đăng ký tài khoản</Button>
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
              <Link to={"/signup"}>
                <Button variant="text">Đăng ký tài khoản</Button>
              </Link>
            </>
          ) : null}
          <div id="recaptcha-container"></div>
        </Box>
      </div>
    
        
    </>
  );
}

export default Login;
