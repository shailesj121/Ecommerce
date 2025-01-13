import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="container-fluid row mt-3 home-page " style={{ paddingTop: '80px' }}>
        <div className="col-md-6 ">
          <img
            src="/images/logo.png"
            alt="contactus"
            style={{ width: "180px", height: "180px", borderRadius: "50%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Welcome to TYOHAR , where innovation & creativity meets excellence. Founded in 2023, we have been at the forefront of curating Handmade items using Epoxy Resin & trousseau packaging for years, delivering handmade masterpieces to meet the evolving needs of our clients. Our commitment to quality, creativity, and customer satisfaction drives everything we do. From our dedicated team of artists , we strive to exceed expectations and set new standards in the industry. Join us on our journey as we continue to craft happiness for you .
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
