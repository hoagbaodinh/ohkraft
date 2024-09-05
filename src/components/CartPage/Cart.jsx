import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { AnimatePresence } from 'framer-motion';

const Cart = () => {
  // Lay danh sach item tu local storage
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="cartContainer">
      <div className="cartGrid">
        {/* Tieu de */}
        <div className="cartHeader ">image</div>
        <div className="cartHeader ">product</div>
        <div className="cartHeader ">price</div>
        <div className="cartHeader ">quantity</div>
        <div className="cartHeader ">total</div>
        <div className="cartHeader ">remove</div>
        {/* Items */}
      </div>
      {/* Animation cho item */}
      <AnimatePresence>
        {cartItems.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </AnimatePresence>
      {/* Actions */}
      <div className="cartActions">
        {/* Ve shopPage */}
        <Link to="/shop" className="cartBack">
          <i className="fa-solid fa-left-long"></i> Continue Shopping
        </Link>
        {/* Den trang checkout */}
        <Link to="/checkout" className="cartCheckout">
          Proceed to checkout <i className="fa-solid fa-right-long"></i>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
