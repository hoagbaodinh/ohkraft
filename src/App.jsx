import './App.css';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useRouteLoaderData,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './pages/Home';
import ShopPage from './pages/Shop';
import DetailPage from './pages/Detail';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import LoginPage from './pages/Login';
import RootPage, { currentUserLoader } from './pages/Root';
import ErrorPage from './pages/Error';
import { fetchCartData, sendCartData } from './store/cart-actions';
import OrderPage from './pages/Order';
import OrderDetail from './pages/OrderDetail';

const ProtectedRoute = ({ children }) => {
  const user = useRouteLoaderData('root');

  if (!user) {
    window.alert('You have to login first');
    return <Navigate to="/login?mode=login" />;
  }

  return children;
};

// Router v6
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    loader: currentUserLoader,
    errorElement: <ErrorPage />,
    id: 'root',
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: 'shop', element: <ShopPage /> },
      {
        path: 'detail',
        children: [
          {
            path: ':detailId',
            element: <DetailPage />,
          },
        ],
      },
      { path: 'cart', element: <CartPage /> },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'order',
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            ),
          },
          {
            path: ':orderId',
            element: (
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            ),
          },
        ],
      },
      { path: 'login', element: <LoginPage /> },
    ],
  },
]);
let isInitial = true;
function App() {
  // Lấy cart từ store
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    // Lấy dữ liệu cart từ localStorage
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    // Nếu lần đầu tiên vào web thì không cần update cart từ store
    if (isInitial) {
      isInitial = false;
      return;
    }
    // Update dữ liệu cart khi cart thay đổi
    sendCartData(cart);
  }, [cart]);
  return <RouterProvider router={router} />;
}

export default App;
