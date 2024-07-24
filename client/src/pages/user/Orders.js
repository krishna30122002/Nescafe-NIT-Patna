import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import ConsoleHelperFrontend from "../../ConsoleHelperFrontend";
import "../../styles/Orders.css";

const Orders = () => {
    const [auth] = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "../../img/favicon.ico";

        return () => {
            favicon.href = "";
        };
    }, []);

    const getOrders = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/auth/user-orders`
            );
            setOrders(data);
        } catch (error) {
            ConsoleHelperFrontend(error);
        }
    };
    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);
    return (
        <Layout title="Your Orders | Nescafè">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 dashboard-menu">
                        <UserMenu />
                    </div>
                    <div className="col-md-9 dashboard-content-orders">
                        <h1 className="text-center">All Orders</h1>
                        {orders?.map((order, idx) => {
                            return (
                                <div className="shadow container-orders">
                                    <table class="table container-table">
                                        <thead className="container-table-head">
                                            <tr className="table-row-products">
                                                <th scope="col">No.</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody className="container-table-row">
                                            <tr className="table-row-products-2">
                                                <td>{idx + 1}</td>
                                                <td>{order?.status}</td>
                                                <td>{order?.buyer?.name}</td>
                                                <td>
                                                    {moment(
                                                        order?.createAt
                                                    ).fromNow()}
                                                </td>
                                                <td>
                                                    {order?.payment.success
                                                        ? "Success"
                                                        : "Failed!"}
                                                </td>
                                                <td>
                                                    {order?.products?.length}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        {order?.products?.map((p, i) => (
                                            <div
                                                className="row margin-of-cart-orders"
                                                style={{
                                                    borderBottom:
                                                        "1px solid gray",
                                                    paddingRight: "0.5rem",
                                                }}
                                            >
                                                <div className="col-md-4 mt-1 image-orders">
                                                    <img
                                                        className="card-img-top product-img-orders"
                                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                                        alt={p.name}
                                                    />
                                                </div>
                                                <div className="col-md-8 p-1 mt-1 data-orders">
                                                    <h4>{p.name}</h4>
                                                    <p>
                                                        {p.description.substring(
                                                            0,
                                                            60
                                                        )}
                                                        ...
                                                    </p>
                                                    <h3>Price: ₹ {p.price}</h3>
                                                </div>
                                                <hr className="divider" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
