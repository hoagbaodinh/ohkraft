import { getFromStorage, saveToStorage } from '../util/local-storage';
import { cartActions } from './index';
// Hàm fetch cart từ localStorage
export const fetchCartData = () => {
  return (dispatch) => {
    // Lay data tu local storage
    const cartData = getFromStorage('cart');
    dispatch(
      cartActions.replaceCart({
        items: cartData ? cartData.items : [],
        totalQuantity: cartData ? cartData.totalQuantity : 0,
      })
    );
  };
};
// Hàm update cart vào localStorage
export const sendCartData = (cart) => saveToStorage('cart', cart);
