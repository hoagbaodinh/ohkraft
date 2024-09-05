import { AnimatePresence } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import { useRouteLoaderData } from 'react-router-dom';
import OrderItem from '../components/Order/OrderItem';
import BreadCrumb from '../components/Layouts/BreadCrumb';

const OrderPage = () => {
  const currentUser = useRouteLoaderData('root');
  const { data, loading } = useFetch('order/user/' + currentUser?._id, {
    withCredentials: true,
  });

  return (
    <>
      <BreadCrumb title="history" URL="history" />
      <main>
        <div className="container">
          <div className="orderContainer">
            <div className="row">
              <div className="col-12 p-0">
                <div className="orderGrid">
                  {/* Tieu de */}
                  <div className="orderHeader ">id order</div>
                  <div className="orderHeader ">id user</div>
                  <div className="orderHeader ">name</div>
                  <div className="orderHeader ">phone</div>
                  <div className="orderHeader ">address</div>
                  <div className="orderHeader ">total</div>
                  <div className="orderHeader ">delivery</div>
                  <div className="orderHeader ">status</div>
                  <div className="orderHeader ">detail</div>
                </div>
                {/* Content */}
                <AnimatePresence>
                  {loading ? (
                    'Loading...'
                  ) : (
                    <>
                      {data?.map((order) => (
                        <OrderItem key={order._id} order={order} />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrderPage;
