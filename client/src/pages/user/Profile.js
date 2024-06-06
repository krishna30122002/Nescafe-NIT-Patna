import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import ConsoleHelperFrontend from "../../ConsoleHelperFrontend";
import "../../styles/Profile.css";

const Profile = () => {
    const [auth, setAuth] = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [answer, setAnswer] = useState("");
    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "../../img/favicon.ico";

        return () => {
            favicon.href = "";
        };
    }, []);

    useEffect(() => {
        const { email, name, phone, answer } = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAnswer(answer);
    }, [auth?.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/auth/profile`,
                { name, email, password, phone, answer }
            );
            if (data?.error) {
                toast.error(data?.error, {
                    position: "top-center",
                });
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated Successfully!", {
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
        <Layout title="Your Profile | Nescafè">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 dashboard-menu">
                        <UserMenu />
                    </div>
                    <div className="col-md-9 dashboard-content-profile">
                        <div className="form-container">
                            <form onSubmit={handleSubmit}>
                                <h2 className="text-center m-2 mb-4">
                                    User Profile
                                </h2>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="form-control"
                                        id="exampleInputName"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="form-control"
                                        id="exampleInputName"
                                        placeholder="Enter your e-mail"
                                        disabled
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Enter Password"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Enter your Phone Number"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={answer}
                                        onChange={(e) =>
                                            setAnswer(e.target.value)
                                        }
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="What is your Security Keyword?"
                                    />
                                </div>

                                <div id="emailHelp" className="form-text">
                                    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                </div>
                                <button
                                    type="submit"
                                    className="btn category-link-user"
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
