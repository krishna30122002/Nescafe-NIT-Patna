import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import toast from "react-hot-toast";
import { Prices } from "../components/Prices.js";
import { useCart } from "../context/cart.js";

const HomePage = () => {
    const [cart, setCart] = useCart();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:8080/api/v1/category/get-category"
            );
            if (data?.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAllCategories();
        getTotal();
    }, []);

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

    const handleFilter = (val, id) => {
        let all = [...checked];
        if (val) {
            all.push(id);
        } else {
            all = all.filter((item) => item !== id);
        }
        setChecked(all);
    };

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
        //eslint-disable-next-line
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filteredByPrice();
    }, [checked, radio]);

    const filteredByPrice = async () => {
        try {
            const { data } = await axios.post(
                "http://localhost:8080/api/v1/product/product-filters",
                { checked, radio }
            );
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title="All Products | Nescafé">
            <div className="row">
                <div className="row mt-3 d-flex flex-column">
                    <div className="col-md-3 dashboard-menu-category">
                        <h3 className="text-center mt-3">Filter by Category</h3>
                        <div className="d-flex flex-column list-group-admin category-filter">
                            {categories?.map((c) => (
                                <Checkbox
                                    className="category-filter-category"
                                    key={c._id}
                                    onChange={(e) =>
                                        handleFilter(e.target.checked, c._id)
                                    }
                                >
                                    {c.name}
                                </Checkbox>
                            ))}
                        </div>
                        <h3 className="text-center mt-5">Filter by Price</h3>
                        <div className="d-flex flex-column">
                            <Radio.Group
                                onChange={(e) => setRadio(e.target.value)}
                                className="list-group-admin category-filter category-filter"
                            >
                                {Prices?.map((p) => (
                                    <div key={p._id}>
                                        <Radio
                                            className="category-filter-category"
                                            value={p.array}
                                        >
                                            {p.name}
                                        </Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                        <div className="d-flex flex-column">
                            <button
                                className="btn btn-danger product-update-btn"
                                style={{
                                    backgroundColor: "rgb(255, 222, 233)",
                                    color: "rgb(71, 77, 82)",
                                    border: " 0.15rem solid rgb(255, 222, 233)",
                                    height: "2.5rem",
                                    marginTop: "1rem",
                                }}
                                onClick={() => window.location.reload()}
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>

                    <div className="col-md-9 dashboard-content parent-wrapper">
                        {/* {JSON.stringify(checked, null, 4)} */}
                        <h1 className="text-center">All Products</h1>
                        <h1 className="text-underline">Products</h1>
                        <div className="d-flex parent">
                            {products?.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/product/${p.slug}`}
                                    className="product-link"
                                >
                                    <div
                                        className="card m-2 child child-homepage"
                                        style={{
                                            width: "15.6rem",
                                        }}
                                    >
                                        <img
                                            className="card-img-top product-img"
                                            src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                            alt={p.name}
                                        />
                                        <div className="card-body card-body-homepage">
                                            <p
                                                className="card-text-homepage"
                                                style={{ color: "#6464ab" }}
                                            >
                                                Tap for more details
                                            </p>
                                            <h5 className="card-title-homepage">
                                                {p.name}
                                            </h5>
                                            <p className="card-text card-title-text-homepage">
                                                {p.description.substring(0, 90)}
                                                ...
                                            </p>
                                            <p className="card-text card-title-text-homepage card-title-text-homepage-price">
                                                ₹ {p.price}
                                            </p>
                                            <Link
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
                                                        "Product added to Orders"
                                                    );
                                                }}
                                                className="btn btn-primary homepage-btn product-submit-btn"
                                            >
                                                Add To Orders
                                            </Link>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div>
                            {products && products.length < total && (
                                <button
                                    style={{
                                        backgroundColor: "rgb(255, 222, 233)",
                                        color: "rgb(71, 77, 82)",
                                        border: " 0.15rem solid rgb(255, 222, 233)",
                                        height: "2.5rem",
                                        marginTop: "1rem",
                                    }}
                                    className="btn btn-primary product-update-btn load-more"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page + 1);
                                    }}
                                >
                                    {loading ? "Loading..." : "Load more..."}
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
