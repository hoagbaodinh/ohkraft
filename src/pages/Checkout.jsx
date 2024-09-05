import { useSelector } from 'react-redux';
import CheckoutForm from '../components/Checkout/CheckoutForm';
import CheckoutOrder from '../components/Checkout/CheckoutOrder';
import BreadCrumb from '../components/Layouts/BreadCrumb';
import { useState } from 'react';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [totalPrice, setTotalPrice] = useState();
  const onGetTotalPrice = (totalPrice) => {
    setTotalPrice(totalPrice);
  };
  return (
    <>
      <BreadCrumb title="checkout" URL="/home/cart/checkout" />
      <main>
        <div className="container">
          <h2 className="cartTitle">billing details</h2>
          <div className="row">
            <div className="col-8">
              <CheckoutForm items={cartItems} totalPrice={totalPrice} />
            </div>

            <div className="col-4">
              <CheckoutOrder
                items={cartItems}
                onGetTotalPrice={onGetTotalPrice}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CheckoutPage;
