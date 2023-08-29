import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import axios from "axios";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 mx-auto">
            <div className="d-flex w-100 flex-wrap">
            <div className="product-grid">
                            {products?.map((p) => (
                                <div className="product-card" key={p._id}>
                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className="product-image"
                                        alt={p.name}
                                    />
                                   <div className="name-div">
                                   <h2 className="product-name">{p.name}</h2>
                                    <p className="product-price">₹{p.price}</p>
                                   </div>
                                    <p className="product-description ">
                                        {p.description.substring(0, 60)}...
                                    </p>

                                    <div class="buttons">
                                        <div>
                                            <button
                                                class="more-info"
                                                onClick={() =>
                                                    navigate(
                                                        `/product/${p.slug}`
                                                    )
                                                }
                                            >
                                                More Info
                                            </button>
                                        </div>
                                        <button class="buy-now">Buy Now</button>
                                    </div>
                                </div>
                            ))}
                        </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
