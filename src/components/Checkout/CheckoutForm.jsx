import { useEffect, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getFromStorage } from '../../util/local-storage';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/index';

const CheckoutForm = ({ items, totalPrice }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isDisable, setIsDisable] = useState(false);

  const currentUser = getFromStorage('currentUser');

  const http = process.env.REACT_APP_API;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setFullname(currentUser.fullname);
      setEmail(currentUser.email);
      setPhone(currentUser.phone);
    }
  }, [currentUser]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (fullname && email && phone && address) {
      const data = {
        userId: currentUser._id,
        fullname,
        email,
        phone,
        address,
        items,
        totalPrice,
      };
      setIsDisable(true);

      try {
        await axios.post(`${http}/api/order/create`, data, {
          withCredentials: true,
        });

        window.alert('Successfully placed your order!');
        //reset cart
        dispatch(
          cartActions.replaceCart({
            items: [],
            totalQuantity: 0,
          })
        );
        return navigate('/order');
      } catch (error) {
        if (error.response) {
          window.alert('Something went wrong!');
          return;
        }
      }

      // chuyen huong ve trang chu
    } else {
      window.alert('You must fill all required fields!');
      setIsDisable(false);

      return navigate('/checkout');
    }
  };
  return (
    <Form className="checkoutForm" onSubmit={submitHandler}>
      <div className="checkoutFormItem">
        <label htmlFor="fullname">full name:</label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          placeholder="Enter your full name here!"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div className="checkoutFormItem">
        <label htmlFor="email">email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email here!"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="checkoutFormItem">
        <label htmlFor="phone">phone number:</label>
        <input
          type="number"
          name="phone"
          id="phone"
          placeholder="Enter your phone number here!"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="checkoutFormItem">
        <label htmlFor="address">address:</label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Enter your address here!"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button className="primary-button" type="submit" disabled={isDisable}>
        Place Order
      </button>
    </Form>
  );
};

export default CheckoutForm;
