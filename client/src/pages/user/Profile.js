import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const Profile = () => {
    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "../../img/favicon.ico";

        return () => {
            favicon.href = "";
        };
    }, []);
    return (
        <Layout title="Your Profile | Nescafè">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 dashboard-menu">
                        <UserMenu />
                    </div>
                    <div className="col-md-9 dashboard-content"></div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
