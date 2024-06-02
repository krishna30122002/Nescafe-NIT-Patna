import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import "../../styles/AuthStyles.css";

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{marginTop:"4rem", minHeight: "81vh" }}>
                <Toaster />
                {children}
            </main>
            <Footer />
        </div>
    );
};

Layout.defaultProps = {
    title: "Nescafé | NIT Patna",
    description: "a stopby for students for refreshments",
    keywords:
        "coffee,chocolate,tea,maggi,hot dog,burger,cold coffee,noodles, milky bar, dark chocolate, biscuits, oreo, namkeen",
    author: "Krishna",
};

export default Layout;
