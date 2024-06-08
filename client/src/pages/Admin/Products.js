import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import ConsoleHelperFrontend from "../../ConsoleHelperFrontend";
import '../../styles/Products.css'

const Products = () => {
    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "../../img/favicon.ico";

        return () => {
            favicon.href = "";
        };
    }, []);

    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get-product`
            );
            setProducts(data.products);
        } catch (error) {
            ConsoleHelperFrontend(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout title="All Products | Admin">
            <div className="container-fluid">
                <div className="row product-category">
                    <div className="col-md-3 dashboard-menu">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 dashboard-content-products parent-wrapper-products">
                        <h1 className="text-center">All Products</h1>
                        <div className="d-flex parent parent-wrapper-products">
                            {products?.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/product/${p.slug}`}
                                    className="product-link"
                                >
                                    <div
                                        className="card m-2 child"
                                        style={{
                                            width: "15.6rem",
                                        }}
                                    >
                                        <img
                                            className="card-img-top product-img"
                                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                            alt={p.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {p.name}
                                            </h5>
                                            <p className="card-text">
                                                {p.description}
                                            </p>
                                            {/* <a href="#" className="btn btn-primary">
                                        Go somewhere
                                    </a> */}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
