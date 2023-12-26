// Products.js

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import "./Product.css";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { IconContext } from "react-icons";
import productData from "./productData.json";

Modal.setAppElement("#root"); // Set the root element for accessibility

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      setData(productData);
      setFilter(productData);
      setLoading(false);
    };

    getProducts();
  }, []);

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const filterProduct = (cat) => {
    if (cat === "all") {
      setFilter(data);
    } else {
      const updatedList = data.filter((item) => item.category.toLowerCase() === cat.toLowerCase());
      setFilter(updatedList);
    }
  };

  const openModal = (productId) => {
    setSelectedProduct(productId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalIsOpen(false);
  };

  const Loading = () => (
    <>
      {/* ... */}
    </>
  );

  const ShowProducts = () => (
    <>
      <div className="buttons text-center py-5">
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("all")}>
          All
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("30kg")}>
          30 KG
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("50kg")}>
          50 KG
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("otherCategory1")}>
          Other Category 1
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("otherCategory2")}>
          Other Category 2
        </button>
        {/* Add more category buttons as needed */}
        {/* ... */}
      </div>

      {filter.map((product) => (
        <div key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <div className="card text-center h-100">
            <Link to={`/product/${product.id}`}>
              <img
                className="card-img-top p-3"
                src={product.image}
                alt="Card"
                height={300}
                onClick={() => openModal(product.id)}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">{product.title.substring(0, 12)}...</h5>
              <p className="card-text">{product.description.substring(0, 90)}...</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item lead">₹ {product.price}</li>
            </ul>
            <div className="card-body">
              <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Modal for displaying product details */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>{selectedProduct && data.find((product) => product.id === selectedProduct)?.title}</h2>
        <p>{selectedProduct && data.find((product) => product.id === selectedProduct)?.description}</p>
        <p>Price: ${selectedProduct && data.find((product) => product.id === selectedProduct)?.price}</p>
      </Modal>
    </>
  );

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">ALL Products</h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">{loading ? <Loading /> : <ShowProducts />}</div>
    </div>
  );
};

export default Products;
