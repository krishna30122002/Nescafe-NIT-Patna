import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import moment from 'moment'
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
    const [auth] = useAuth();
    const [orders, setOrders] = useState([]);
    const [status] = useState([
        "Not in Process",
        "Accepted",
        "Processing",
        "Ready to Collect",
        "Cancel",
    ]);
    // const [changeStatus, setChangeStatus] = useState("");

    const getOrders = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
            );
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);
    
    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "../img/favicon.ico";

        return () => {
            favicon.href = "";
        };
    }, []);

    const handleChange=async(orderId, value)=>{
        try { 
            const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,{status:value,})
            getOrders();
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout title={"All Orders | Outlet"}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 dashboard-menu">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 dashboard-content">
                        <h1 className="text-center">All Orders</h1>
                        {orders?.map((order, idx) => {
                            return (
                                <div className="shadow container-orders">
                                    <table class="table container-table">
                                        <thead className="container-table-head">
                                            <tr>
                                                <th scope="col">No.</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody className="container-table-row">
                                            <tr>
                                                <td>{idx + 1}</td>
                                                <td>
                                                    <Select variant={false} onChange={(val)=>handleChange(order._id,val)} defaultValue={order?.status}>
                                                        {
                                                            status.map((s,i)=>(
                                                                <Option key={i} value={s}>{s}</Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </td>
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
                                                className="row margin-of-cart"
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
                                                <hr
                                                    style={{
                                                        height: 2,
                                                        borderWidth: 0,
                                                        color: "gray",
                                                        backgroundColor: "gray",
                                                    }}
                                                />

                                                <div className="col-md-8 p-1 mt-1 data-orders">
                                                    <h4>{p.name}</h4>
                                                    <p>
                                                        {p.description.substring(
                                                            0,
                                                            45
                                                        )}
                                                        ...
                                                    </p>
                                                    <h3>Price: ₹ {p.price}</h3>
                                                </div>
                                                <hr />
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

export default AdminOrders;
