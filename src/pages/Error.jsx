import Navbar from "../components/Layouts/Navbar";
import Footer from "../components/Layouts/Footer";
import LiveChat from "../components/Layouts/LiveChat";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  let message = "Something went wrong";
  if (error.data) message = error.data?.message;
  console.log(message);
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1>An Error Has Occur!</h1>
        <p>{message}</p>
        <Link to="/" className="primary-button">
          <i className="fa-solid fa-left-long"></i> Back to Home Page
        </Link>
      </div>
      <Footer />
      <LiveChat />
    </>
  );
};

export default ErrorPage;
