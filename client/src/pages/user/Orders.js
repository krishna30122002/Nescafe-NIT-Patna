import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Orders = () => {
    const [auth, setAuth]=useAuth()
    const [orders, setOrders]=useState([])

    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "../../img/favicon.ico";

        return () => {
            favicon.href = "";
        };
    }, []);

    const getOrders=async()=>{
        try {
            const {data}=await axios.get("http://localhost:8080/api/v1/auth/user-orders")
            setOrders(data)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(()=>{
        if(auth?.token)
        getOrders()
    },[auth?.token])
    return (
        <Layout title="Your Orders | Nescafè">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 dashboard-menu">
                        <UserMenu />
                    </div>
                    <div className="col-md-9 dashboard-content"><h1>All Orders</h1><p>{JSON.stringify(orders, null, 4)}</p></div>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
