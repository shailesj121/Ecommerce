import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // carousel styles
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best offers"}>
      {/* Banner Image */}
      <div className="full-width-banner">
        <img
          src="/images/banner.jpg"
          className="banner-img"
          alt="bannerimage"
        />
        <div className="centered">
          <h1>Welcome to Garden Gems by Tyohar</h1>
          <p>Your one-stop shop for festive shopping!</p>
        </div>
      </div>

      {/* Product Carousel */}
      <div className="carousel-container">
  <Carousel
    autoPlay
    infiniteLoop
    interval={1000} 
    showThumbs={false}
    showStatus={false}
    centerMode
    centerSlidePercentage={33}
    emulateTouch
  >
    {products.slice(0, 6).map((p) => (
      <div key={p._id} onClick={() => navigate(`/product/${p.slug}`)}>
        <img
          src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
          alt={p.name}
          className="carousel-image"
        />
        <p className="legend">{p.name}</p>
      </div>
    ))}
  </Carousel>
</div>

      {/* Filters and Products */}
      <div
        className="container-fluid row mt-3 home-page"
        style={{ background: "linear-gradient(90deg, #CC95C0, #DBD4B4, #7AA1D2)" }}
      >
        <div className="col-md-3 filters">
          <div className="filters-container">
            {/* Category filter */}
            <div className="dropdown filter">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="categoryDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Category
              </button>
              <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                {categories?.map((c) => (
                  <li key={c._id} className="dropdown-item">
                    <Checkbox
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price filter */}
            <div className="dropdown filter">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="priceDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Price Range
              </button>
              <ul className="dropdown-menu" aria-labelledby="priceDropdown">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <li key={p._id} className="dropdown-item">
                      <Radio value={p.array}>{p.name}</Radio>
                    </li>
                  ))}
                </Radio.Group>
              </ul>
            </div>

            {/* Reset Filters */}
            <button
              className="btn btn-danger reset-btn"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap products-container">
            {products?.map((p) => (
              <div className="card m-auto" key={p._id}>
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                    <button
                      className="btn btn-success ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Redirecting to Checkout");
                        navigate("/cart");
                      }}
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />{" "}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
