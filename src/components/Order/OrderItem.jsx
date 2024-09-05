import React from 'react';
import { motion } from 'framer-motion';
import formatPrice from '../../util/format-price';
import { useNavigate } from 'react-router-dom';

const OrderItem = ({ order }) => {
  const navigate = useNavigate();
  const {
    _id,
    userId,
    fullname,
    phone,
    address,
    total_price,
    delivery,
    status,
  } = order;
  const fmPrice = formatPrice(total_price);

  const clickHandler = (e) => {
    e.preventDefault();
    navigate('/order/' + _id);
  };
  return (
    <div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        open
        className="orderGrid"
      >
        {/* ID Order */}

        <div className="orderGridItem ">{_id}</div>
        {/* ID User*/}
        <div className="orderGridItem ">{userId}</div>
        {/* Name */}
        <div className="orderGridItem ">{fullname}</div>
        {/* Phone */}
        <div className="orderGridItem ">{phone}</div>
        {/* Address */}
        <div className="orderGridItem ">{address}</div>
        {/* Total Price */}
        <div className="orderGridItem  orderItemPrice">{fmPrice}</div>
        {/* Delivery */}
        <div className="orderGridItem ">{delivery}</div>
        {/* Status */}
        <div className="orderGridItem ">{status}</div>
        {/* Remove Item */}
        <div className="orderGridItem  ">
          <button className="orderDetailBtn" onClick={clickHandler}>
            <em>View</em> <i className="fa-solid fa-right-long"></i>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderItem;
