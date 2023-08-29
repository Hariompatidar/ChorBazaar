// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Checkbox, Radio } from "antd";
// import { Prices } from "../components/Prices";
// import { useCart } from "../context/cart";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Layout from "./../components/Layout/Layout";
// import { AiOutlineReload } from "react-icons/ai";
// import "../styles/Homepage.css";

// const HomePage = () => {
//     const navigate = useNavigate();
//     const [cart, setCart] = useCart();
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [checked, setChecked] = useState([]);
//     const [radio, setRadio] = useState([]);
//     const [total, setTotal] = useState(0);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);

//     //get all cat
//     const getAllCategory = async () => {
//         try {
//             const { data } = await axios.get("/api/v1/category/get-category");
//             if (data?.success) {
//                 setCategories(data?.category);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         getAllCategory();
//         getTotal();
//     }, []);
//     //get products
//     const getAllProducts = async () => {
//         try {
//             setLoading(true);
//             const { data } = await axios.get(
//                 `/api/v1/product/product-list/${page}`
//             );
//             setLoading(false);
//             setProducts(data.products);
//         } catch (error) {
//             setLoading(false);
//             console.log(error);
//         }
//     };

//     //getTOtal COunt
//     const getTotal = async () => {
//         try {
//             const { data } = await axios.get("/api/v1/product/product-count");
//             setTotal(data?.total);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         if (page === 1) return;
//         loadMore();
//     }, [page]);
//     //load more
//     const loadMore = async () => {
//         try {
//             setLoading(true);
//             const { data } = await axios.get(
//                 `/api/v1/product/product-list/${page}`
//             );
//             setLoading(false);
//             setProducts([...products, ...data?.products]);
//         } catch (error) {
//             console.log(error);
//             setLoading(false);
//         }
//     };

//     // filter by cat
//     const handleFilter = (value, id) => {
//         let all = [...checked];
//         if (value) {
//             all.push(id);
//         } else {
//             all = all.filter((c) => c !== id);
//         }
//         setChecked(all);
//     };
//     useEffect(() => {
//         if (!checked.length || !radio.length) getAllProducts();
//     }, [checked.length, radio.length]);

//     useEffect(() => {
//         if (checked.length || radio.length) filterProduct();
//     }, [checked, radio]);

//     //get filterd product
//     const filterProduct = async () => {
//         try {
//             const { data } = await axios.post(
//                 "/api/v1/product/product-filters",
//                 {
//                     checked,
//                     radio,
//                 }
//             );
//             setProducts(data?.products);
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     return (
//         <Layout title={"ALl Products - Best offers "}>
//             <div className="banner-div">
//                 <img className="" src="/images/banner.jpg" alt="First slide" />
//             </div>
//             {/* banner image */}
//             <div className="container-fluid row mt-3 home-page">
//                 <div className="col-md-3 filters">
//                     <h4 className="text-center">Filter By Category</h4>
//                     <div className="d-flex flex-column">
//                         {categories?.map((c) => (
//                             <Checkbox
//                                 key={c._id}
//                                 onChange={(e) =>
//                                     handleFilter(e.target.checked, c._id)
//                                 }
//                             >
//                                 {c.name}
//                             </Checkbox>
//                         ))}
//                     </div>
//                     {/* price filter */}
//                     <h4 className="text-center mt-4">Filter By Price</h4>
//                     <div className="d-flex flex-column">
//                         <Radio.Group onChange={(e) => setRadio(e.target.value)}>
//                             {Prices?.map((p) => (
//                                 <div key={p._id}>
//                                     <Radio value={p.array}>{p.name}</Radio>
//                                 </div>
//                             ))}
//                         </Radio.Group>
//                     </div>
//                     <div className="d-flex flex-column">
//                         <button
//                             className="btn btn-danger"
//                             onClick={() => window.location.reload()}
//                         >
//                             RESET FILTERS
//                         </button>
//                     </div>
//                 </div>
//                 <div className="col-md-9 ">
//                     <h1 className="text-center">All Products</h1>
//                     <div className="d-flex flex-wrap gap-2">
//                         {products?.map((p) => (
//                             <div className="product-card" key={p._id}>
//                                 <img
//                                     src={`/api/v1/product/product-photo/${p._id}`}
//                                     className="product-image"
//                                     alt={p.name}
//                                 />
//                                 <h2 className="product-name">{p.name}</h2>
//                                 <p className="product-price">{p.price}</p>
//                                 <p className="product-description ">
//                                     {p.description.substring(0, 99)}...
//                                 </p>

//                                 <div class="buttons">
//                                     <button
//                                         class="more-info"
//                                         onClick={() =>
//                                             navigate(`/product/${p.slug}`)
//                                         }
//                                     >
//                                         More Info
//                                     </button>
//                                     <button
//                                         class="add-to-cart"
//                                         onClick={() => {
//                                             setCart([...cart, p]);
//                                             localStorage.setItem(
//                                                 "cart",
//                                                 JSON.stringify([...cart, p])
//                                             );
//                                             toast.success("Item Added to cart");
//                                         }}
//                                     >
//                                         Add to Cart
//                                     </button>
//                                     <button class="buy-now">Buy Now</button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="m-2 p-3">
//                         {products && products.length < total && (
//                             <button
//                                 className="btn loadmore"
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     setPage(page + 1);
//                                 }}
//                             >
//                                 {loading ? (
//                                     "Loading ..."
//                                 ) : (
//                                     <>
//                                         {" "}
//                                         Loadmore <AiOutlineReload />
//                                     </>
//                                 )}
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default HomePage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";
import { useAuth } from "../context/auth";

const HomePage = () => {
    const navigate = useNavigate();
    const [auth] = useAuth();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
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
    //get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `/api/v1/product/product-list/${page}`
            );
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //getTOtal COunt
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `/api/v1/product/product-list/${page}`
            );
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // filter by cat
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

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(
                "/api/v1/product/product-filters",
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

    const handleBuyNow=()=>{
        auth.token ? (navigate("/formComponent")):(navigate('/login'));
    }



    return (
        <Layout title={"All Products - Best Offers"}>
            <div className="banner-div">
                <img
                    className="banner-image"
                    src="/images/banner.jpg"
                    alt="Banner"
                />
            </div>
            <div className="container mt-3 home-page">
                <div className="row">
                    <div className="col-md-3 filters">
                        <h4 className="text-center">Filter By Category</h4>
                        <div className="d-flex flex-column items-center">
                            {categories?.map((c) => (
                                <Checkbox
                                    key={c._id}
                                    onChange={(e) =>
                                        handleFilter(e.target.checked, c._id)
                                    }
                                >
                                    {c.name}
                                </Checkbox>
                            ))}
                        </div>
                        {/* price filter */}
                        <h4 className="text-center mt-4">Filter By Price</h4>
                        <div className="d-flex flex-column">
                            <Radio.Group
                                onChange={(e) => setRadio(e.target.value)}
                            >
                                {Prices?.map((p) => (
                                    <div key={p._id}>
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                        <div className="d-flex flex-column">
                            <button
                                className="btn btn-danger"
                                onClick={() => window.location.reload()}
                            >
                                RESET FILTERS
                            </button>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center mb-4 mt-2">Our Hero Products</h1>
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
                                            <button
                                                class="add-to-cart"
                                                onClick={() => {
                                                    setCart([...cart, p]);
                                                    localStorage.setItem(
                                                        "cart",
                                                        JSON.stringify([
                                                            ...cart,
                                                            p,
                                                        ])
                                                    );
                                                    toast.success(
                                                        "Item Added to cart"
                                                    );
                                                }}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                        <button class="buy-now" onClick={handleBuyNow}>Buy Now</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="loadmore-container">
                            {products && products.length < total && (
                                <button
                                    className="loadmore"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page + 1);
                                    }}
                                >
                                    {loading ? (
                                        "Loading ..."
                                    ) : (
                                        <>
                                            Load More{" "}
                                            <AiOutlineReload className="reload-icon" />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
