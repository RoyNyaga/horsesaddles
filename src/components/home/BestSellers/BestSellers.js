import React from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
} from "../../../assets/images/index";

const BestSellers = ({ products }) => {
  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
      {products.map((product) => {
        return <div key={product.id} className="px-2">
          <Product
            id={product.id}
            img={product.img_url}
            productName={product.name}
            price={product.price}
            color={product.color}
            badge={product.has_badge}
            des={product.description}
            dHoverDetails={false}
          />
        </div>
      })}
      </div>
    </div>
  );
};

export default BestSellers;
