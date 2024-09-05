import { useDispatch } from 'react-redux';
import { cartActions } from '../../store';
import formatPrice from '../../util/format-price';
import { motion } from 'framer-motion';
import { getFromStorage } from '../../util/local-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
const CartItem = (props) => {
  const { image, title, quantity, totalPrice, price, _id, stock } = props.item;

  const [isDisable, setIsDisable] = useState(false);
  const fmPrice = formatPrice(price);
  const formatTotalPrice = formatPrice(totalPrice);
  const currentUser = getFromStorage('currentUser');

  const http = process.env.REACT_APP_API;

  // Disable increase button
  useEffect(() => {
    if (quantity >= stock) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [quantity, stock]);
  // Dispatch redux
  const dispatch = useDispatch();
  const userId = currentUser?._id || '';

  // Thêm 1 item vào cart item
  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        _id,
        image,
        title,
        price,
        quantity: 1,
        stock,
      })
    );
    if (userId)
      axios.post(
        `${http}/api/cart/add-item`,
        {
          userId,
          productId: _id,
          quantity: 1,
        },
        { withCredentials: true }
      );
  };

  // Xoá 1 item
  const removeItemHandler = () => {
    if (+quantity === 1) {
      if (window.confirm('Are you sure you want to remove item from cart?'))
        dispatch(cartActions.removeItemFromCart(_id));
      else return;
    } else dispatch(cartActions.removeItemFromCart(_id));

    if (userId) {
      axios.put(
        `${http}/api/cart/remove-item`,
        {
          userId: userId,
          productId: _id,
        },
        { withCredentials: true }
      );
    }
  };

  // Hàm xoá item khỏi cart
  const deleteItemHandler = () => {
    if (window.confirm('Are you sure you want to remove item from cart?')) {
      dispatch(cartActions.deleteItemFormCart(_id));

      if (userId) {
        axios.put(
          `${http}/api/cart/delete-item`,
          {
            userId: userId,
            productId: _id,
          },
          { withCredentials: true }
        );
      }
    } else return;
  };
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      open
      className="cartGrid"
    >
      {/* Image */}
      <div className="cartGridItem cartItemImg">
        <img
          src={`${image.includes('http') ? image : `${http}/images/${image}`}`}
          alt="cart item"
        />
      </div>
      {/* Product name */}
      <div className="cartGridItem  cartItemTitle">{title}</div>
      {/* Price */}
      <div className="cartGridItem  cartItemPrice">{fmPrice}</div>
      {/* Quantity */}
      <div className="cartGridItem  cartItemQuantity">
        <button className="navBtn" onClick={removeItemHandler}>
          <i className="fa-solid fa-caret-left"></i>
        </button>
        <span>{quantity}</span>
        <button
          className="navBtn"
          onClick={addItemHandler}
          disabled={isDisable}
        >
          <i className="fa-solid fa-caret-right"></i>
        </button>
      </div>
      {/* Total Price */}
      <div className="cartGridItem  cartItemPrice">{formatTotalPrice}</div>
      {/* Remove Item */}
      <div className="cartGridItem  cartItemRemove">
        <button className="  cartItemRemoveBtn" onClick={deleteItemHandler}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
