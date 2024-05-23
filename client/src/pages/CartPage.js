import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { Link } from "react-router-dom";
import paypallogo from "../img/paypalpng.png";
import PayPal from "../img/paypal.svg";
// import Payment from "./Payment";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Image } from "antd";

const CartPage = () => {
    const navigate = useNavigate();

    const [auth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState();
    const [instance, setInstance] = useState();
    const [loading, setLoading] = useState(false);

    // const [quantity, setQuantity] = useState(1);

    const removeCartItem = (pid) => {
        try {
            let mycart = [...cart];
            let idx = mycart.findIndex((item) => item._id === pid);
            mycart.splice(idx, 1);
            localStorage.setItem("cart", JSON.stringify(mycart));
            setCart(mycart);
        } catch (error) {
            console.log(error);
        }
    };

    const totalPrice = () => {
        const myObj = {
            style: "currency",
            currency: "INR",
        };
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString(
                "en-IN",
                { style: "currency", currency: "INR" },
                myObj
            );
        } catch (error) {
            console.log(error);
        }
    };

    // const totalPrice = () => {
    //     const myObj = {
    //         style: "currency",
    //         currency: "INR",
    //     };
    //     try {
    //         let total = 0;
    //         cart?.map((item) => {
    //             total = total + item.price;
    //         });
    //         const formattedTotal = total.toLocaleString("en-IN", {
    //             style: "currency",
    //             currency: "INR",
    //         }, myObj);

    //         // Sending total to backend
    //         fetch('/api/v1/total-price', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ totalPrice: formattedTotal })
    //         })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Failed to send total to backend');
    //             }
    //             // Handle successful response
    //             console.log('Total sent successfully');
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });

    //         return formattedTotal;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const increaseQuantity = () => {
    //     setQuantity((prevQuantity) => prevQuantity + 1);
    // };

    // const decreaseQuantity = () => {
    //     if (quantity > 1) {
    //         setQuantity((prevQuantity) => prevQuantity - 1);
    //     }
    // };

    // const handlePayment = ({props}) => {
    //     // Make a POST request to your backend endpoint with the amountFrontend
    //     fetch("http://localhost:8080/pay", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ props }),
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         console.log(data);
    //         // Handle response if needed
    //       })
    //       .catch((error) => {
    //         console.error("Error:", error);
    //         // Handle error if needed
    //       });
    //   };

    // const navigate = useNavigate();

    // payment gateway
    const getToken = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:8080/api/v1/product/braintree/token"
            );
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getToken();
    }, [auth?.token]);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(
                "http://localhost:8080/api/v1/product/braintree/payment",
                {
                    nonce,
                    cart,
                }
            );
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Successful");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    return (
        <Layout title={"Orders | Nescafé"}>
            <div className="container p-0">
                <div className="m-3">
                    <h1 className="text-center mb-1">{`Hello ${
                        auth?.token && auth?.user?.name
                    }`}</h1>
                    <h4 className="text-center">
                        {cart?.length > 1
                            ? `You have ${cart.length} items in your orders ${
                                  auth?.token ? "" : "Please log in to checkout"
                              }`
                            : "Your Orders is Empty"}
                    </h4>
                </div>
                <div className="row cart-">
                    <div className="col md-6 dashboard-content ">
                        <h2
                            className="margin-of-cart text-center"
                            style={{
                                borderBottom: "3px solid gray",
                                paddingRight: "0.5rem",
                            }}
                        >
                            Orders
                        </h2>
                        {cart?.map((p) => (
                            <div
                                className="row margin-of-cart"
                                style={{
                                    borderBottom: "1px solid gray",
                                    paddingRight: "0.5rem",
                                }}
                            >
                                <div className="col-md-4 mt-1">
                                    <img
                                        className="card-img-top product-img"
                                        src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
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

                                <div className="col-md-8 p-1 mt-1">
                                    <h5>{p.name}</h5>
                                    <p>{p.description.substring(0, 45)}...</p>
                                    <h5>Price: ₹ {p.price}</h5>
                                    <div className="d-flex flex-row">
                                        <button
                                            className="btn btn-login-pass btn-category btn-cart"
                                            style={{
                                                border: "0.125rem solid #ffdee9",
                                                marginTop: "-0.2rem",
                                            }}
                                            onClick={() => {
                                                removeCartItem(p._id);
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>
                    <div className="col-md-6 dashboard-content text-center">
                        <h2
                            className="margin-of-cart"
                            style={{
                                borderBottom: "3px solid gray",
                                paddingRight: "0.5rem",
                            }}
                        >
                            Orders Summary
                        </h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h3>Total: {totalPrice()}</h3>
                        <div className="btn">
                            <div className="container main">
                                <div className="center">
                                    <div>
                                        <img
                                            style={{ marginTop: "0.5rem" }}
                                            width={100}
                                            src={paypallogo}
                                            alt="payment.png"
                                        />
                                    </div>
                                    <h3 className="fs-4 mt-3">
                                        <span className="w-bold">
                                            Pay Now using{" "}
                                            <img
                                                width={100}
                                                src={PayPal}
                                                alt="payment.png"
                                            />
                                            {/* <span
                                                className="w-bold"
                                                style={{ color: "#003087" }}
                                            >
                                                PayPal
                                            </span> */}
                                        </span>
                                    </h3>
                                </div>
                                <div className="card px-5 py-4 mt-2 mb-2">
                                    <form
                                        onSubmit={handlePayment}
                                        className="form-order"
                                    >
                                        <div className="col-12">
                                            <p className="fs-5">
                                                <strong>Name:</strong>
                                                {auth?.user?.name}
                                            </p>
                                        </div>
                                        <div className="col-12">
                                            <p className="fs-5">
                                                <strong>Number:</strong>
                                                {auth?.user?.phone}
                                            </p>
                                        </div>
                                        <div className="col-12">
                                            <p className="fs-5">
                                                <strong>Amount:</strong>₹{" "}
                                                {totalPrice()}
                                            </p>
                                        </div>
                                        <div>
                                            {auth?.token ? (
                                                <div className="col-12 center">
                                                    {/* <Link
                                                        to={
                                                            "http://localhost:8080/pay"
                                                        }
                                                        className="w-100 btn category-link-payment"
                                                    >
                                                        Pay Now
                                                    </Link> */}
                                                </div>
                                            ) : (
                                                <div>
                                                    <button
                                                        className="btn col-12 center category-link-order"
                                                        onClick={() =>
                                                            navigate("/login", {
                                                                state: "/orders",
                                                            })
                                                        }
                                                    >
                                                        Please login to get your
                                                        food.
                                                    </button>
                                                </div>
                                            )}
                                            <div className="mt-2">
                                                {!clientToken ||
                                                !cart?.length ? (
                                                    ""
                                                ) : (
                                                    <DropIn
                                                        options={{
                                                            authorization:
                                                                clientToken,
                                                            paypal: {
                                                                flow: "vault",
                                                            },
                                                        }}
                                                        onInstance={(
                                                            instance
                                                        ) =>
                                                            setInstance(
                                                                instance
                                                            )
                                                        }
                                                    />
                                                )}
                                                <button
                                                    className="btn btn-order"
                                                style={{marginTop:"1.5rem"}}
                                                    onClick={handlePayment}
                                                    disabled={
                                                        loading ||
                                                        !instance
                                                    }
                                                >
                                                    {loading
                                                        ? "Processing..."
                                                        : "Make Payment"}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
