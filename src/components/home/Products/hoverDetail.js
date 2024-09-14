import React from 'react'
import { useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import { addToCart } from "../../../redux/orebiSlice";


function HoverDetail(props) {
  const dispatch = useDispatch();

  return (
    <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
      <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
        <li
          onClick={() =>
            dispatch(
              addToCart({
                _id: props._id,
                name: props.productName,
                quantity: 1,
                image: props.img,
                badge: props.badge,
                price: props.price,
                colors: props.color,
              })
            )
          }
          className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
        >
          Add to Cart
          <span>
            <FaShoppingCart />
          </span>
        </li>
        <li
          onClick={props.handleProductDetails}
          className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
        >
          View Details
          <span className="text-lg">
            <MdOutlineLabelImportant />
          </span>
        </li>
      </ul>
    </div>
  )
}

export default HoverDetail;
