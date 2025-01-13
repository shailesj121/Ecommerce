import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="container mt-5 home-page" style={{ paddingTop: '80px' }}> {/* Adjust this value based on your navbar height */}
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="privacy policy"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6"> {/* Change this from col-md-4 to col-md-6 to fit the layout better */}
          <h1 className="bg-dark p-2 text-white text-center">PRIVACY POLICY</h1>
          <p className="mt-3">
            At <strong>TYOHAR</strong>, we respect your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our website and services.
          </p>
          <h5 className="mt-3">1. Information We Collect</h5>
          <p>
            We collect information that you provide to us directly, such as when you create an account, place an order, subscribe to our newsletter, or contact customer support. This information may include your name, email address, phone number, shipping address, and payment details.
          </p>
          <p>
            We also automatically collect certain information through cookies and similar technologies when you use our website, such as your IP address, browsing behavior, and device information.
          </p>

          <h5 className="mt-3">2. How We Use Your Information</h5>
          <p>
            The information we collect is used to:
          </p>
          <ul>
            <li>Process and fulfill your orders.</li>
            <li>Provide customer support and respond to your inquiries.</li>
            <li>Improve our website, services, and user experience.</li>
            <li>Send promotional emails and offers, if you have opted in.</li>
            <li>Prevent fraudulent activities and ensure the security of our platform.</li>
          </ul>

          <h5 className="mt-3">3. Sharing Your Information</h5>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to third parties except to trusted partners who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.
          </p>
          <p>
            We may also release your information when required to comply with legal obligations or protect our rights and those of others.
          </p>

          <h5 className="mt-3">4. Data Security</h5>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. However, no online transmission is 100% secure, and we cannot guarantee the absolute security of your data.
          </p>

          <h5 className="mt-3">5. Your Rights</h5>
          <p>
            You have the right to access, correct, or delete your personal information. You may also choose to opt out of receiving marketing emails from us at any time.
          </p>

          <h5 className="mt-3">6. Changes to Our Privacy Policy</h5>
          <p>
            We may update this Privacy Policy periodically to reflect changes in our practices. We encourage you to review this page regularly for the latest information on our privacy practices.
          </p>

          <h5 className="mt-3">7. Contact Us</h5>
          <p>
            If you have any questions or concerns about our Privacy Policy, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> www.help@ecommerceapp.com<br />
            <strong>Phone:</strong> +919318391068<br />
            <strong>Address:</strong> F15/6, Third Floor, Krishna Nagar, Delhi 10051
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
