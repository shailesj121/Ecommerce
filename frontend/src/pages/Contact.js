import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="container-fluid row mt-3 home-page" style={{ paddingTop: '80px' }}>
        <div className="col-md-6">
          {/* Embedded Google Map */}
      
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Have any queries or need information about our products? Feel free to reach out to us! We are available during our business hours to assist you.
          </p>
          <p className="mt-3">
            <BiMailSend /> : help@tyohar.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +919318391068
          </p>
          <p className="mt-3">
            <BiSupport /> : Business Hours: 11:00 AM - 7:00 PM (Monday - Saturday)
          </p>
          <p className="mt-3">
            <strong>Address:</strong> F15/6, Third Floor, Krishna Nagar, Delhi 10051
          </p>
          <h5 className="mt-4">Follow Us</h5>
          <p className="mt-3">
            <a href="https://www.facebook.com/share/WCjm88oezBmX7U6x/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </p>
          <p className="mt-3">
            <a href="https://www.instagram.com/tyohar_bydr.apoorva/profilecard/?igsh=MTQyenZmZ3picTMwZQ==" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
