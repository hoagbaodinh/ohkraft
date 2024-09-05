import {
  Link,
  NavLink,
  useNavigate,
  useRouteLoaderData,
} from 'react-router-dom';
import { saveToStorage } from '../../util/local-storage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData } from '../../store/cart-actions';

const Navbar = () => {
  // Lay du lieu currenUser ma root load
  const currentUser = useRouteLoaderData('root');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lay tong so luong item co trong cart qua redux

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const logoutHandler = () => {
    localStorage.removeItem('currentUser');
    saveToStorage('cart', { items: [], totalQuantity: 0 });
    localStorage.removeItem('roomId');
    dispatch(fetchCartData());
    navigate('/');
    navigate(0);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <ul className="headerLeft">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? 'activeNav' : undefined
                  }
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    isActive ? 'activeNav' : undefined
                  }
                  end
                >
                  Shop
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-4 d-flex justify-content-center">
            <Link to="/" className="headerCenter"></Link>
          </div>
          <div className="col-4">
            <ul className="headerRight">
              <li>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive ? 'activeNav' : undefined
                  }
                  end
                >
                  <i className="fa-solid fa-cart-flatbed navCart ">
                    <div className="navCartQuantity">{totalQuantity}</div>
                  </i>
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={currentUser ? '/order' : '/login?mode=login'}
                  className={({ isActive }) =>
                    isActive ? 'activeNav' : undefined
                  }
                  end
                >
                  <i className="fa-solid fa-user "></i>
                  {currentUser ? currentUser.fullname : 'Login'}
                  {currentUser && <i className="fa-solid fa-caret-down"></i>}
                </NavLink>
              </li>
              {currentUser && (
                <li>
                  <button onClick={logoutHandler}>(Logout)</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
