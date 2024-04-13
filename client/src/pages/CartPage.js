import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
// import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();

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

    // const navigate = useNavigate();
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
                                    <button
                                        className="btn btn-login-pass btn-category btn-cart"
                                        style={{
                                            border: "0.125rem solid #ffdee9",
                                        }}
                                        onClick={() => {
                                            removeCartItem(p._id);
                                        }}
                                    >
                                        Remove
                                    </button>
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
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
