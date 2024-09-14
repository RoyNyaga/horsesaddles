import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Sale from "../../components/home/Sale/Sale";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import YearProduct from "../../components/home/YearProduct/YearProduct";
import supabase from "../../supabase";

const Home = () => {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    let { data: product_horsesaddle } = await supabase
      .from('product_horsesaddle')
      .select('*')
      setProducts(product_horsesaddle)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="w-full mx-auto">
      <Banner />
      <BannerBottom />
      <div className="max-w-container mx-auto px-4">
        <Sale />
        {products && <NewArrivals products={products} />}
        <BestSellers />
        <YearProduct />
        <SpecialOffers />
      </div>
    </div>
  );
};

export default Home;
