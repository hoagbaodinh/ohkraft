import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

const ProductListItem = ({ product }) => {
  const { name, price, img1, _id } = product;
  const navigate = useNavigate();

  const http = process.env.REACT_APP_API;

  // Chuyen den trang product detail
  const handleClick = () => {
    navigate(`/detail/${_id}`);
    window.scrollTo(0, 300);
  };
  return (
    <div className="col-12 col-sm-6 col-md-4">
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.5 },
          visible: { opacity: 1, scale: 1 },
        }}
        initial={{ opacity: 0 }}
        animate="visible"
        exit="hidden"
        className="pdListItem"
      >
        <img
          src={`${img1.includes('http') ? img1 : `${http}/images/${img1}`}`}
          alt="pd item"
          onClick={handleClick}
        />
        <p className="pdItemName" onClick={handleClick}>
          {name}
        </p>
        <p className="pdItemPrice">{price}</p>
      </motion.div>
    </div>
  );
};

export default ProductListItem;
