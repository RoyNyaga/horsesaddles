import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import supabase from "../../supabase";
import { missingImage } from "../../assets/images";
import BackButton from "../../components/buttons/backButton";
import ProductCarousel from "../Dashboard/components/productCarousel";

const ProductDetails = () => {
  const location = useLocation();
  const [product, setProduct] = useState({})
  const productId = location.state.item;
  const isAdmin = location.state.isAdmin;
  console.log("location state", location.state)
  // const getProduct = async () => {
  //   let { data: product_horsesaddle } = await supabase
  //     .from('product_horsesaddle')
  //     .select("*")
  //     // Filters
  //     .eq('id', productId)
  //     setProduct(product_horsesaddle[0])
  // }

  const getProduct = useCallback(async () => {
    let { data: product_horsesaddle } = await supabase
      .from('product_horsesaddle')
      .select("*")
      // Filters
      .eq('id', productId)
      setProduct(product_horsesaddle[0])
  }, [productId]);


  useEffect(() => {
    getProduct()
  }, [getProduct]);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto">
        <div className="my-3 d-flex justify-content-between align-items-center">
          <BackButton />
          { isAdmin && 
            <Link className="btn btn-primary" to={`/dashboard/products/${productId}/edit`}>Edit</Link>
          }
        </div>
        <div className="row">
          <div className="col-md-5 d-flex align-items-center">
          { product.img_url ? <ProductCarousel images_urls={product.images_urls}/> 
            : <img className="w-full" src={missingImage} alt="missing" /> }
          </div>
          
          <div className="col-md-7"> 
            <ProductInfo productInfo={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
