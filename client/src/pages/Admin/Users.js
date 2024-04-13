import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const Users = () => {
    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "../../img/favicon.ico";
  
        return () => {
            favicon.href = "";
        };
    }, []);
    return (
        <Layout title="All Users | Admin">
            
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 dashboard-menu">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9 dashboard-content"></div>
                    </div>
                </div>
            
        </Layout>
    );
};

export default Users;
