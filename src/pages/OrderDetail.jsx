import React from 'react';
import { useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import formatPrice from '../util/format-price';
import { AnimatePresence, motion } from 'framer-motion';

const OrderDetail = () => {
  const navigate = useNavigate();
  const currentUser = useRouteLoaderData('root');
  const { orderId } = useParams();
  if (!currentUser || !orderId) {
    navigate('/');
  }
  const { data, loading } = useFetch('order/order/' + orderId, {
    withCredentials: true,
  });
  if (!data) {
    navigate('/order');
  }
  const { userId, fullname, phone, address, total_price, products } = data;

  return (
    <main>
      <div className="container">
        {loading ? (
          'Loading...'
        ) : (
          <>
            {data && (
              <div className="orderDetailContainer">
                <div className="orderInfo">
                  <h1>information order</h1>
                  <p>ID User: {userId}</p>
                  <p>Full Name: {fullname}</p>
                  <p>Phone: {phone}</p>
                  <p>Address: {address}</p>
                  <p>Total: {formatPrice(total_price)}</p>
                </div>
                <div className="orderItems">
                  <div className="row">
                    <div className="col-12 p-0">
                      <div className="orderDetailGrid">
                        <div className="orderHeader ">id product</div>
                        <div className="orderHeader ">image</div>
                        <div className="orderHeader ">name</div>
                        <div className="orderHeader ">price</div>
                        <div className="orderHeader ">count</div>
                      </div>
                      <AnimatePresence>
                        {products?.map((item) => (
                          <motion.div
                            variants={{
                              hidden: { opacity: 0, y: -10 },
                              visible: { opacity: 1, y: 0 },
                            }}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            open
                            className="orderDetailGrid"
                            key={item._id}
                          >
                            {/* Product ID */}
                            <div className="orderDetailGridItem ">
                              {item.prodId._id}
                            </div>
                            {/* Image */}
                            <div className="orderDetailGridItem orderImg ">
                              <img
                                src={`${
                                  item.prodId.img1?.includes('http')
                                    ? item.prodId.img1
                                    : `http://localhost:5050/images/${item.prodId.img1}`
                                }`}
                                alt="cart item"
                              />
                            </div>
                            {/* Name */}
                            <div className="orderDetailGridItem ">
                              {item.prodId.name}
                            </div>
                            {/* Price */}
                            <div className="orderDetailGridItem ">
                              {formatPrice(item.prodId.price)}
                            </div>
                            {/* Quantity */}
                            <div className="orderDetailGridItem ">
                              {item.quantity}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default OrderDetail;
