import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
Withdrawal.propTypes = {};

function Withdrawal(props) {
  const currentUser = useSelector((state) => state.account.current);
  const [open, setOpen] = useState(false);
  const [itemClick, setWithClick] = useState({});
  const [num, setNum] = useState("");
  const [owner, setOwner] = useState("");
  const [price, setPrice] = useState("");
  const [selected, setSelected] = useState();
  const [listBank, setListBank] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChangenum = (event) => {
    setNum(event.target.value);
  };
  const handleOnChangeowner = (event) => {
    setOwner(event.target.value);
  };
  const handleOnChangeBank = (event) => {
    setSelected(event.target.value);
    console.log("onchange", event.target.value);
  };
  const handleOnChangePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleSubmitWith = (id) => {
    try {
      const formWith = {
        storeID: itemClick,
        price: price,
        numBankCart: num,
        ownerBankCart: owner,
        bankID: selected,
      };
      console.log("formCancel : ", formWith);
      console.log("id", itemClick);
      console.log("reason", selected);
      // call api

       axios.post(`http://esmpfree-001-site1.etempurl.com/api/Asset/store_withdrawal`, formWith).then(handleClose)
    } catch (error) {
      console.log("fail to update: ", error);
    }
  };

  const handleOpenWithForm = (id) => {
    setOpen(true);
    setWithClick(id);
  };

  //fetchData
  const fetchData = async () => {
    await axios
      .get(`http://esmpfree-001-site1.etempurl.com/api/Asset/bank`)
      .then((response) => setListBank(response.data));
  };

  useEffect(() => {
    fetchData()
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          handleOpenWithForm(currentUser.storeID);
        }}
      >
        Withdrawal
      </Button>
      <Dialog open={open}>
      
        <DialogContent
          sx={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
            height: "300vh"
          }}
        >
              <DialogTitle
          sx={{
            textAlign: "center",
            borderBottom: "1px solid #d3d3d3",
          }}
        >
          Enter Infor Withdrawal.
        </DialogTitle>
          {/* <Box className="line">
            <Typography width={150} color="primary" cx={{ margin: "20px" }}>
              Bank:
            </Typography>
            <Select
            
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ width: "50%", padding: 0 }}
            >
              {listBank.map((listbank, index) => (
                <MenuItem
                  key={index}
                  value={listBank.bankID}
                  onChange={handleOnChangeBank}
                  
                >
                  {listbank.bankName}
                </MenuItem>
              ))}
              
            </Select>
          </Box> */}
          <select style = {{padding: '15px', borderradius: '10px', margin: "10px"}} onChange={handleOnChangeBank}>
            {listBank.map((listbank, index) => (
              <option 
                key={index}
                value={listbank.bankID}
                //   onChange={handleOnChangeBank}
              >
                {listbank.bankName}
              </option>
            ))}
          </select>
      
          
          <TextField
         
          type="number"
            placeholder="Num Card"
            required
            onChange={handleOnChangenum}
            alt="avatar"
            sx={{ position: "static !important", mr: 2, width: "400px" }}
          ></TextField>
         
          <TextField
            placeholder="Owner"
            required
            onChange={handleOnChangeowner}
            alt="avatar"
            sx={{ position: "static !important", mr: 2, width: "400px" }}
          ></TextField>
           
          <TextField
      
          placeholder="Price"
            required
            type="number"
            onChange={handleOnChangePrice}
            alt="avatar"
            sx={{ position: "static !important", mr: 2, width: "400px" }}
          ></TextField>
            <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmitWith}>Ok</Button>
        </DialogActions>
        </DialogContent>

      </Dialog>
    </>
  );
}

export default Withdrawal;
