import React from "react";
import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConsoleHelperFrontend from "../../ConsoleHelperFrontend";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();
    // const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
                { email, answer, newPassword }
            );
            if (res && res.data.success) {
                toast.success("Password Reset Successfully!", {
                    position: "top-center",
                });
                navigate("/login");
            } else {
                toast.error("Something Went Wrong!", {
                    position: "top-center",
                });
            }
        } catch (error) {
            ConsoleHelperFrontend(error);
            toast.error("Something Went Wrong!", {
                position: "top-center",
            });
        }
    };

    return (
        <Layout title="Forgot Password | Nescafè">
            <div className="register-page">
                <h1>Oops! Forgotten your password?</h1>
                <h2>Answer to hop in again</h2>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputName"
                            placeholder="Enter your e-mail"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputName"
                            placeholder="Enter Your Security Keyword"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter New Password"
                            required
                        />
                    </div>

                    <div id="emailHelp" className="form-text">
                        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                    </div>
                    <button type="submit" className="btn">
                        Reset!
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default ForgotPassword;
