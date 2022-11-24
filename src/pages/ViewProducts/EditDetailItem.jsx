import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditListSubItem from './EditListSubItem';

EditDetailItem.propTypes = {
    
};

function EditDetailItem({item}) {

console.log("EditDetailItem: ", item);

    const [current, setCurrent] = useState(0);
    const [editAmount, seteditAmount] = useState("");
    const [editPrice, seteditPrice] = useState("");

    const length = item?.list_Image?.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
      };
    
      const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
      };
    
      if (!Array.isArray(item.list_Image) || item.list_Image.length <= 0) {
        return null;
      }
    return (
        <div class="item_content">
      <div className="item_content-top">
        <section className="slider">
          <ArrowBackIosIcon
           
            className="leftIcon"
            onClick={() => {
              prevSlide();
            }}
          />
          <ArrowForwardIosIcon
            
            className="rightIcon"
            onClick={() => {
              nextSlide();
            }}
          />
          {item.list_Image.map((image_path, index) => {
            return (
              <div
                className={index === current ? "slide active" : "slide"}
                key={index}
              >
                {index === current && (
                  <img
                    className="item_image"
                    src={image_path.path}
                    alt="Card image cap"
                  />
                )}
              </div>
            );
          })}
        </section>
        <p className="item_name">{item.name}</p>
        <div className="item_infor-sell">
          <div className="item_sold">Đã bán: {item.num_Sold}</div>
        </div>
      </div>

      <div className="item_information">
        <h3 class="title">Thông tin chung</h3>
        {item.specification_Tag.map((spe) => (
          <table>
            <tr>
              <th className="Item-specification_value">
                {spe.specificationName + " "}:
              </th>
              <td className="Item-specification_value">{spe.value}</td>
            </tr>
          </table>
        ))}
        <div>
          <p className="model_des">Phù hợp với</p>
          <div className="Item_model">
            {item.listModel.map((model) => (
              <ul>
                <li>{model.name},</li>
              </ul>
            ))}
          </div>
        </div>
      </div>

      <h3 className="title">Thông tin mẫu mã</h3>
      {item.listSubItem.map((subitem) => (
        <EditListSubItem subitem={subitem}/>
      ))}
    </div>
    );
}

export default EditDetailItem;