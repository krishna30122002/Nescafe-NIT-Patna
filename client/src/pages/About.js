import React from "react";
import Layout from "../components/Layout/Layout";
import me from "../img/me.png";

const About = () => {
    return (
        <Layout title="About Us">
            <div className="row contact-cont">
                <div className="col-md-6">
                    <img
                        src={me}
                        className="img-fluid rounded-start about-me"
                        alt="contact-us"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4 about-content">
                    <h1 className="bg-dark p-2 text-white text-center about-title">
                        About Me
                    </h1>
                    <p className="text-justify mt-2 about-comp-title cont-about">
                        My name is Krishna Kant Verma. I am a skilled
                        professional with expertise in web development, data
                        structures and algorithms, and Java programming. In the
                        realm of web development.
                    </p>
                    <p className="cont-about">
                        I have experience in building responsive and
                        user-friendly websites. I am proficient in front-end
                        technologies such as HTML, CSS, and JavaScript, as well
                        as popular frameworks like React.js and Vue.js.
                        Additionally, I am adept at backend development using
                        technologies such as Node.js, Express.js, and databases
                        like MongoDB and MySQL.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default About;
