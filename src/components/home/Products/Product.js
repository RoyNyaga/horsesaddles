import React from "react";

import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import HoverDetail from "./hoverDetail";
import { missingImage } from "../../../assets/images";

const Product = ({ dHoverDetails = false, isAdmin=false, ...props }) => {
  const _id = props.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);
  const navigate = useNavigate();
  const handleProductDetails = () => {
    console.log(props)
    navigate(`/product/${rootId}`, {
      state: {
        item: props.id,
        isAdmin: isAdmin,
      },
    });
  };


  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div onClick={handleProductDetails}>
          {props.img ? <Image className="w-full h-full" imgSrc={props.img} /> 
            : <Image className="w-full h-full" imgSrc={missingImage} /> }
          
        </div>
        <div className="absolute top-6 left-8">
          {props.badge && <Badge text="New" />}
        </div>
        {dHoverDetails && <HoverDetail _id={props.id}
          img={props.img}
          productName={props.name}
          price={props.price}
          color={props.color}
          badge={true}
          des={props.description} 
          handleProductDetails={handleProductDetails}/>}
      </div>

      
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {props.productName}
          </h2>
          <p className="text-[#767676] text-[14px]">${props.price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.color}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
