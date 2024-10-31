import React from "react";
import { Link } from "react-router-dom";
import { productOfTheYear } from "../../../assets/images";
import ShopNow from "../../designLayouts/buttons/ShopNow";
import Image from "../../designLayouts/Image";

const YearProduct = () => {
  return (
    <Link to="/shop">
      <div className="w-full h-80 mb-20 bg-[#f3f3f3] md:bg-transparent relative font-titleFont">
        <Image
          className="object-cover hidden md:inline-block carosel-images"
          imgSrc={"https://res.cloudinary.com/it-s-tech/image/upload/v1730030603/horse-saddles/463988940_511029245145068_1804832544002803947_n_yplk3h.jpg"}
        />
        <div className="w-full md:w-2/3 xl:w-1/2 h-80 absolute px-4 md:px-0 top-0 right-0 flex flex-col items-start gap-6 justify-center">
          <h1 className="text-3xl font-semibold text-primeColor">
            Keep Shoping
          </h1>
          <p className="text-base font-normal text-primeColor max-w-[600px] mr-4">
          Explore our collection of saddles made to suit all riding styles and preferences. Find the perfect fit for you and your horse.
          </p>
          <ShopNow />
        </div>
      </div>
    </Link>
  );
};

export default YearProduct;
