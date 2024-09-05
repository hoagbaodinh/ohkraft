import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ProductDetail from './ProductDetail';

const ProductItem = ({ product }) => {
  const [isShowingDetail, setIsShowingDetail] = useState(false);
  const { name, price, img1 } = product;
  const http = process.env.REACT_APP_API;

  const handleDone = () => {
    setIsShowingDetail(false);
  };

  const handleClick = () => {
    setIsShowingDetail(true);
  };
  return (
    <>
      <AnimatePresence>
        {isShowingDetail && (
          <ProductDetail onDone={handleDone} product={product} />
        )}
      </AnimatePresence>
      <div className="col-6 col-md-3">
        <div className="pdItemContent">
          <img
            src={`${img1.includes('http') ? img1 : `${http}/images/${img1}`}`}
            alt="pd item"
            className="pdItemImg"
            onClick={handleClick}
          />
          <p className="pdItemName" onClick={handleClick}>
            {name}
          </p>
          <p className="pdItemPrice">{price}</p>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
