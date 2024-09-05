import { useNavigate } from 'react-router-dom';
import bannerImg from '../../assets/banner-slider-1.png';

const Banner = () => {
  const navigate = useNavigate();
  const clickHandler = (e) => {
    e.preventDefault();
    navigate('/shop');
  };

  return (
    <section className="banner">
      <div className="container ">
        <div className="bannerContent">
          <p className="bannerSubtitle">emotional box</p>
          <h3 className="bannerTitle">
            New <br /> collection
          </h3>
          <button type="button" onClick={clickHandler} className="bannerButton">
            Browse collections
          </button>
          <img src={bannerImg} alt="banner " className="bannerImg" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
