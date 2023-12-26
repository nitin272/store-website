import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Footer, Navbar } from "../components";
import staticProductData from "./productData.json";

const Product = () => {
    const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSimilar, setLoadingSimilar] = useState(true);
  const dispatch = useDispatch();

  const addProductToCart = (product) => {
    dispatch(addCart(product));
  };

  const Loading = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 py-3">
          <Skeleton height={400} width={400} />
        </div>
        <div className="col-md-6 py-5">
          <Skeleton height={30} width={250} />
          <Skeleton height={90} />
          <Skeleton height={40} width={70} />
          <Skeleton height={50} width={110} />
          <Skeleton height={120} />
          <Skeleton height={40} width={110} inline={true} />
          <Skeleton className="mx-3" height={40} width={110} />
        </div>
      </div>
    </div>
  );

  const ShowProduct = () => (
    <div className="container my-5 py-2">
      {product && (
        <div className="row">
          <div className="col-md-6 py-3">
            <img src={product.image} alt={product.title} className="img-fluid" />
          </div>
          <div className="col-md-6 py-5">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addProductToCart(product)}>Add to Cart</button>
          </div>
        </div>
      )}
    </div>
  );

  const ShowSimilarProduct = () => (
    <div className="py-4 my-4">
      {/* ... (your ShowSimilarProduct component code) */}
    </div>
  );

  useEffect(() => {
    const getProduct = async () => {
      // Simulate API call to get product details
      const selectedProduct = staticProductData.find((item) => item.id === parseInt(id));
      setProduct(selectedProduct);
      setLoading(false);
    };

    const getSimilarProducts = async () => {
      // Simulate API call to get similar products
      setSimilarProducts([staticProductData[1], staticProductData[2], staticProductData[3]]);
      setLoadingSimilar(false);
    };

    getProduct();
    getSimilarProducts();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            {loadingSimilar ? <Loading /> : <ShowSimilarProduct />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
