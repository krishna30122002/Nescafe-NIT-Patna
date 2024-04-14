import React, { useState } from "react";
// import axios from "axios";
// import phonepe from "../img/phonepe.svg";
// import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import paymentPage from '../img/payment.svg'

const Payment = () => {
    // const [loading, setLoading] = useState(false);

    // const data = {
    //     name: "Raj",
    //     amount: 1,
    //     number: "9876543210",
    //     MUID: "MUID" + Date.now(),
    //     txnId: "T" + Date.now(),
    // };

    // const handlePayment = (e) => {
    //     e.preventDefault();
    //     // setLoading(true);
    //     axios
    //         .post("http://localhost:8080/api/v1/payment", { ...data })
    //         .then((res) => {
    //             setTimeout(() => {
    //                 // setLoading(false);
    //             }, 1500);
    //         })
    //         .catch((err) => {
    //             // setLoading(false);
    //             console.log(err);
    //         });
    // };

    return (
        <>
            {/* 
            <div className="container main">
                <div className="center">
                    <img width={100} src={phonepe} alt="payment.png" />
                    <h3 className="fs-4 mt-2">
                        <span className="w-bold">
                            Pay Now using{" "}
                            <span
                                className="w-bold"
                                style={{ color: "#6739B7" }}
                            >
                                PhonePe
                            </span>
                        </span>
                    </h3>
                </div>
                <div className="card px-5 py-4 mt-4">
                    <form onSubmit={handlePayment}>
                        <div className="col-12">
                            <p className="fs-5">
                                <strong>Name:</strong>
                                {data.name}
                            </p>
                        </div>
                        <div className="col-12">
                            <p className="fs-5">
                                <strong>Number:</strong>
                                {data.number}
                            </p>
                        </div>
                        <div className="col-12">
                            <p className="fs-5">
                                <strong>Amount:</strong>₹ {data.amount}
                            </p>
                        </div>
                        {/* {!loading ? ( */}
            {/* <div className="col-12 center">
                                <Link to={"/payment"} className="w-100 btn category-link-payment" type="submit">
                                    Pay Now
                                </Link>
                            </div> */}
            {/* ) : (
                            <div className="col-12 text-center">
                                <button className="w-100" type="submit">
                                    <div
                                        className="spinner-border"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                </button>
                            </div> */}
            {/* )} */}
            {/* </form>
                </div>
            </div> */}
            {/* */}
            <Layout>
                <div className="container container-payment">
                <div className="column align-center justify center">
                    <img className="under_construction" src={paymentPage} alt="payment_construction.png" />
                    {/* <h1 className="text-center">Sorry!</h1> */}
                    <Link  to={'/orders'} className="btn btn-category payment-go-back">Go Back</Link>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Payment;
