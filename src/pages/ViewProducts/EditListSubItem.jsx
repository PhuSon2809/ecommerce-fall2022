import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "~/CSS/Base.css"
import "~/CSS/Item.css"

EditListSubItem.propTypes = {
    
};

function EditListSubItem({subitem}) {

    console.log("subitem: ", subitem);

    const [editAmount, seteditAmount] = useState("");
    const [editPrice, seteditPrice] = useState("");

    useEffect(() => {
        if (subitem != null) {
          seteditAmount(subitem.amount);
          seteditPrice(subitem.price);
        }
      }, [subitem]);
  
      const handleOnChangeAmount = (event) => {
        seteditAmount(event.target.value);
      };
      const handleOnChangePrice = (event) => {
        seteditPrice(event.target.value);
      };

      const handleSubmitUpdate = () => {
        try {
            const formUpdate = {
                subItemID: subitem.sub_ItemID,
                amount: editAmount,
                price: editPrice
            }
            console.log("formUpdate: ", formUpdate);
            // call api
          
               axios.put(`http://esmpfree-001-site1.etempurl.com/api/Item/update_subitem`, formUpdate)
              
            


        } catch (error) {
            console.log("fail to update: ", error);
        }
      }


    return (
        <div class="item_sub_information">
          <ul class="sub_list_info">
            <li>
              <img class="subitem_image" src={subitem.image.path} />
            </li>
            <li>Tên: {subitem.sub_ItemName}</li>
   
          <li>
              Số lượng: {" "}
              <input style={{border: "1px solid black"}}
              id="standard-basic" 
                type="text"
                value={editAmount}
                onChange={handleOnChangeAmount}
              />
            </li>

          
            <li className="item_price">Giá: {" "}
            <input
            style={{border: "1px solid black"}}
                type="text"
                value={editPrice}
                onChange={handleOnChangePrice}
              />
            </li>
          </ul>
          <Button className="btn btn--primary" style={{float: "right"}} onClick={handleSubmitUpdate}>Cập nhật</Button>
        </div>
    );
}

export default EditListSubItem;