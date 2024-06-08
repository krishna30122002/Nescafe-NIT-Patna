import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import '../../styles/AdminDashboard.css'

const AdminDashboard = () => {
    const [auth] = useAuth();
    useEffect(() => {
      const favicon = document.querySelector("link[rel='icon']");
      favicon.href = "../img/favicon.ico";

      return () => {
          favicon.href = "";
      };
  }, []);

    return (
        <Layout title="Dashboard | Admin">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 dashboard-menu">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 dashboard-content-admin">
                        <h3>Name: {auth?.user?.name}</h3>
                        <h5>Email: {auth?.user?.email}</h5>
                        <h5>Phone: {auth?.user?.phone}</h5>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
