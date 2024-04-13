import React from "react";
import Layout from "../components/Layout/Layout";
import policy from "../img/privacypolicy.png";

const Policy = () => {
    return (
        <Layout title="Privacy Policy">
            <div className="row contact-cont">
                <div className="col-md-6 policy-img">
                    <img
                        src={policy}
                        className="img-fluid rounded-start policy-img"
                        alt="contact-us"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4 about-content">
                    <h1 className="bg-dark p-2 text-white text-center about-title">
                        Privacy Policy
                    </h1>
                    <p className="text-justify mt-2 about-comp-title cont-about">
                        We prioritize the privacy and security of your personal
                        information. We adhere to strict data protection
                        regulations and employ robust security measures to
                        safeguard your data from unauthorized access, use, or
                        disclosure. Your information is collected and processed
                        only for specified, legitimate purposes, and we never
                        share or sell your data to third parties without your
                        explicit consent. You have the right to access, rectify,
                        or delete your personal data at any time. By using our
                        services, you consent to the collection and use of your
                        information in accordance with this privacy policy.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Policy;
