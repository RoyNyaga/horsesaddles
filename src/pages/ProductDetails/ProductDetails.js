import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { FaDownload } from "react-icons/fa";
import supabase from "../../supabase";
import { missingImage } from "../../assets/images";
import BackButton from "../../components/buttons/backButton";

const tabs = [
  {
    id: "Fiche Technique",
    label: "Fiche Technique",
  },
  {
    id: "Description",
    label: "Description",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    id: "Video",
    label: "Video",
    content: (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/watch?v=6e0yIRDVPlA&list=RD6e0yIRDVPlA&start_radio=1"
        title="YouTube Video"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    ),
  },
  // Add more tabs as needed
];

const ProductDetails = () => {
  const location = useLocation();
  const [product, setProduct] = useState({})
  const productId = location.state.item;
  const isAdmin = location.state.isAdmin;
  console.log("location state", location.state)
  const getProduct = async () => {
    let { data: product_horsesaddle, error } = await supabase
      .from('product_horsesaddle')
      .select("*")
      // Filters
      .eq('id', productId)
      setProduct(product_horsesaddle[0])
  }


  useEffect(() => {
    getProduct()
  }, []);

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
          { product.img_url ? <img className="w-full" src={product.img_url} alt="missing photo" /> 
            : <img className="w-full" src={missingImage} alt="missing photo" /> }
            
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
