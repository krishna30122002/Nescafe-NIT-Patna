import React from "react";
import Layout from "../components/Layout/Layout";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import contactus from "../img/contactus.png";

const Contact = () => {
    return (
        <Layout title="Contact Us">
            <div className="row contact-cont">
                <div className="col-md-6">
                    <img
                        src={contactus}
                        className="img-fluid rounded-start"
                        alt="contact-us"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4 cont-content">
                    <h1 className="bg-dark p-2 text-white text-center">
                        Contact Us
                    </h1>
                    <p className="text-justify mt-2 content-comp-title">
                        Any query related websites?
                    </p>
                    <p className="text-justify mt-2 content-comp-title">
                        Feel free to contact via social handles given below ⬇
                    </p>
                    <p className="mt-3 content-comp">
                        <FaEnvelope /> www.forum@nitpnescafe.in
                    </p>
                    <p className="mt-3 content-comp">
                        <FaPhone /> 91-9889892831
                    </p>
                    <p className="mt-3 content-comp">☎ 1800:1500:2300</p>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
