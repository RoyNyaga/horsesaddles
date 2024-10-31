import { produceWithPatches } from "immer";
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
  const [newArrivalProducts, setNewArrivalProducts] = useState([])

  const getProducts = async () => {
    let { data: product_horsesaddle } = await supabase
      .from('product_horsesaddle')
      .select('*')
      .limit(4)
      console.log(product_horsesaddle)
      setProducts(product_horsesaddle)
  }

  const getNewProducts = async () => {
    let { data: product_horsesaddle } = await supabase
      .from('product_horsesaddle')
      .select('*')
      .eq('has_badge', true)
      setNewArrivalProducts(product_horsesaddle)
  }

  useEffect(() => {
    getProducts()
    getNewProducts()
  }, [])

  return (
    <div className="w-full mx-auto">
      <Banner />
      <BannerBottom />
      <div style={{ marginTop: "170px"}} className="max-w-container mx-auto px-4">
        {newArrivalProducts && <NewArrivals products={newArrivalProducts} />}
        { products && <BestSellers products={products}/>}
        <YearProduct />
        <SpecialOffers />
      </div>
    </div>
  );
};

export default Home;
