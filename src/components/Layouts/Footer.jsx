import { Link } from 'react-router-dom';
import logoInv from '../../assets/logo-invert.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="footerLogo">
              <img src={logoInv} alt="" />
            </div>

            <div className="footer-contact">
              <div className="row ">
                <div className="d-flex align-items-center mb-2">
                  <Link to="#" className="contact-icon">
                    <i className="fa-solid fa-envelope"></i>
                  </Link>
                  <div>
                    <span>ngtta1301@gmail.com</span>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Link to="#" className="contact-icon">
                    <i className="fa-solid fa-phone"></i>
                  </Link>
                  <div>
                    <span>(+84) 702 810 700</span>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Link to="#" className="contact-icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </Link>
                  <div>
                    <span>Ho Chi Minh City</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <h3 className="footerTitle">social media</h3>

            <ul className="footerList">
              <li className="footerItem">
                <Link to="/">instagram</Link>
              </li>
              <li className="footerItem">
                <Link to="/">facebook</Link>
              </li>
              <li className="footerItem">
                <Link to="/">Tiktok</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
