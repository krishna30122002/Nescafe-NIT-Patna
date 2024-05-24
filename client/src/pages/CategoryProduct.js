import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, Link, NavLink } from "react-router-dom";

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    // const [total, setTotal] = useState(0);
    // const [page, setPage] = useState(1);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "../../img/favicon.ico";

        return () => {
            favicon.href = "";
        };
    }, []);
    const params = useParams();

    useEffect(() => {
        if (params?.slug) {
            getProductByCategory();
        }
    }, []);

    const getProductByCategory = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8080/api/v1/product/product-category/${params.slug}`
            );
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout>
            <div className="container mt-3 mb-2">
                <h1 className="text-center">Category -: {category?.name}</h1>
                <h3 className="text-center text-underline">
                    {products?.length} results found
                </h3>
                <div className="row">
                    <div className="col-md-9 dashboard-content parent-wrapper">
                        {/* {JSON.stringify(checked, null, 4)} */}
                        <h3 className="m-2 mb-3">Products:</h3>
                        <div className="d-flex parent">
                            {products?.map((p) => (
                                <NavLink
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
                                            <Link to={"/cart"} className="btn btn-primary homepage-btn product-submit-btn">
                                                Add To Orders
                                            </Link>
                                        </div>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CategoryProduct;
