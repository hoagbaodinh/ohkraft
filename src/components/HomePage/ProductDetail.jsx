import { useNavigate } from 'react-router-dom';
import Modal from '../Layouts/Modal';

const ProductDetail = ({ product, onDone }) => {
  const { name, price, img1, short_desc, _id } = product;

  const http = process.env.REACT_APP_API;

  const navigate = useNavigate();
  // Chuyen huong den ShopPage
  const handleClick = () => {
    navigate('/detail/' + _id);
    window.scrollTo(0, 300);
  };
  return (
    <Modal onClose={onDone}>
      <div className="pdDetailContainer">
        <div className="row">
          <div className="col-6">
            <img
              src={`${img1.includes('http') ? img1 : `${http}/images/${img1}`}`}
              alt="pd detail"
              className="w-100"
            />
          </div>
          <div className="col-6">
            <div className="pdDetailContent">
              <h2 className="pdDetailTitle">{name}</h2>
              <p className="pdDetailPrice">{price}</p>
              <p className="pdDetailDescription">{short_desc}</p>
              <button className="pdDetailButton" onClick={handleClick}>
                <i className="fa-solid fa-cart-shopping"></i>
                View Detail
              </button>
            </div>
          </div>
        </div>
        <button className="closeDetailBtn" onClick={onDone}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </Modal>
  );
};

export default ProductDetail;
