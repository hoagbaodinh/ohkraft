import { useEffect } from 'react';
import formatPrice from '../../util/format-price';

const CheckoutOrder = ({ items, onGetTotalPrice }) => {
  const totalPrice = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const fmTotalPrice = formatPrice(totalPrice);
  useEffect(() => {
    onGetTotalPrice(totalPrice);
  }, [totalPrice, onGetTotalPrice]);

  return (
    <div className="cartTotalContainer">
      <h2>Your Order</h2>
      {items.map((item) => (
        <div className="checkoutItem" key={item._id}>
          <div className="checkoutItemContent">
            <span>{item.title}</span>
            <span className="priceAndQuantity">
              {`${formatPrice(item.price)} x ${item.quantity}`}
            </span>
          </div>
          <div className="hz-line"></div>
        </div>
      ))}
      <div className="cartTotal">
        <h3>total</h3>
        <span> {fmTotalPrice}</span>
      </div>
    </div>
  );
};

export default CheckoutOrder;
