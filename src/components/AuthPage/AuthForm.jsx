import { useState } from 'react';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getFromStorage, saveToStorage } from '../../util/local-storage';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchCartData } from '../../store/cart-actions';

const AuthForm = () => {
  // Lay du lieu searchParams
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const http = process.env.REACT_APP_API;

  // Tra ve isLogin = true khi searhParams dang o mode login
  const isLogin = searchParams.get('mode') === 'login';

  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [isDisable, setIsDisable] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsDisable(true);
    if (isLogin) {
      if (!email || !password) {
        window.alert('You must fill all the required fields');
        return;
      }
      const authData = {
        email,
        password,
      };

      try {
        const { data } = await axios.post(`${http}/api/auth/login`, authData, {
          withCredentials: true,
        });
        //Tạo currentUser và lưu vào localStorage thể hiện có User đang đăng nhập
        saveToStorage('currentUser', data.userDetails);
        const cart = getFromStorage('cart');
        // Neu trong gio hang trong thi fetch cart data tu db
        if (cart.totalQuantity === 0) {
          const { data: cartItems } = await axios.get(
            `${http}/api/cart/get-cart/${data.userDetails._id}`,
            {
              withCredentials: true,
            }
          );

          const totalQuantity = cartItems.reduce(
            (acc, item) => item.quantity + acc,
            0
          );
          saveToStorage('cart', { items: cartItems, totalQuantity });
          dispatch(fetchCartData());
        } else {
          await axios.post(
            `${http}/api/cart/replace-cart`,
            {
              userId: data.userDetails._id,
              items: cart.items,
            },
            { withCredentials: true }
          );
        }
        // Thông báo đăng nhập thành công
        window.alert('Login successful!');
        return navigate('/');
      } catch (error) {
        if (error.response) {
          window.alert(error.response.data.message);
          console.clear();
          setPassword('');
          setIsDisable(false);
          navigate('/login?mode=login');
        }
      }
    } else {
      if (!email || !password || !fullname || !phone) {
        window.alert('You must fill all the required fields');
      }
      const authData = {
        email,
        password,
        fullname,
        phone,
      };
      try {
        await axios.post(`${http}/api/auth/register`, authData);
        // Thong bao cho nguoi dung
        window.alert('Sign Up Successfully!');
        setIsDisable(false);
        setPassword('');

        // Quay ve trang login
        return navigate('/login?mode=login');
      } catch (error) {
        if (error.response) {
          window.alert(error.response.data.message);
          console.clear();
          setIsDisable(false);
          navigate('/login?mode=signup');
        }
      }
    }
  };
  return (
    <section className="authForm">
      <form className="authFormContainer" onSubmit={submitHandler}>
        <h1>{isLogin ? 'Sign In' : 'Sign Up'}</h1>
        {!isLogin && (
          <div className="authFormControl">
            <input
              type="text"
              id="fullname"
              name="fullname"
              required
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
              placeholder="Full Name"
            />
          </div>
        )}
        <div className="authFormControl">
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
        </div>
        <div className="authFormControl">
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </div>

        {!isLogin && (
          <div className="authFormControl">
            <input
              type="number"
              id="phone"
              name="phone"
              required
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder="Phone"
            />
          </div>
        )}
        <div className="authFormActions">
          <button disabled={isDisable}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
          <div className="authFormNote">
            <span>{isLogin ? 'Create an account?' : 'Login? '}</span>
            <Link
              to={`?mode=${isLogin ? 'signup' : 'login'}`}
              className="authFormToggle"
            >
              {isLogin ? 'Sign up' : 'Click'}
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};
export default AuthForm;
