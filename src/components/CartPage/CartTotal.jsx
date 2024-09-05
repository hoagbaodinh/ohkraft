import { useSelector } from 'react-redux';
import formatPrice from '../../util/format-price';

const CartTotal = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const fmTotalPrice = formatPrice(totalPrice);
  return (
    <div className="cartTotalContainer">
      <h2>cart total</h2>
      <div className="cartSubTotal">
        <h3>sub total</h3>
        <span className="cartSubTotalPrice"> {fmTotalPrice}</span>
      </div>
      <div className="hz-line"></div>
      <div className="cartTotal">
        <h3>total</h3>
        <span> {fmTotalPrice}</span>
      </div>

      <div className="cartCoupon">
        <input type="text" placeholder="Enter your coupon" />
        <button className="primary-button cartCouponBtn">
          <i className="fa-solid fa-gift"></i> Apply coupon
        </button>
      </div>
    </div>
  );
};

export default CartTotal;
