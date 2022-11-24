import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserOutlined, ShopOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import "antd/dist/antd.css";
import "~/CSS/Item.css";
import "~/CSS/Base.css";
import EditDetailItem from "./EditDetailItem";

DetailItem.propTypes = {};

function DetailItem(props) {
  const itemID = useParams();
//   const [editAmount, seteditAmount] = useState("");
//   const [editPrice, seteditPrice] = useState("");
//   const [current, setCurrent] = useState(0);
  const [item, setItem] = useState({});


  const fetchData = async (e) => {
    await axios
      .get(
        `http://esmpfree-001-site1.etempurl.com/api/Item/item_detail?itemID=${itemID.id}`
      )
      .then((response) => setItem(response.data));
  };

  useEffect(() => {
    fetchData()
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);
  return (
    <EditDetailItem item={item}/>

  );
}

export default DetailItem;
