import { useEffect, useState } from 'react';
import { cartActions } from '../../store/index';
import { useDispatch, useSelector } from 'react-redux';
import formatPrice from '../../util/format-price';
import { getFromStorage } from '../../util/local-storage';
import axios from 'axios';

const DetailInfo = ({ product }) => {
  const [quantityNum, setQuantityNum] = useState(1);
  const [inputValue, setInputValue] = useState(1);
  const [success, setSuccess] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [isIncrDisable, setIsIncrDisable] = useState(false);
  const currentUser = getFromStorage('currentUser');
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  // Function format giá
  const price = formatPrice(product.price);

  const http = process.env.REACT_APP_API;

  // Thêm item vào cart theo số lượng
  const addItemToCartHandler = () => {
    if (+quantityNum) setSuccess(true);
    //Them item vào cart theo so luong
    dispatch(
      cartActions.addItemToCart({
        _id: product._id,
        image: product.img1,
        title: product.name,
        quantity: +quantityNum,
        price: product.price,
        stock: product.stock,
      })
    );
    const userId = currentUser?._id || '';

    //Neu co user dang login thi luu vao db
    if (userId)
      axios.post(
        `${http}/api/cart/add-item`,
        {
          userId,
          productId: product._id,
          quantity: +quantityNum,
        },
        { withCredentials: true }
      );

    setQuantityNum(1);
  };

  // Bat su kien inputValue thay thoi
  useEffect(() => {
    if (!inputValue) setQuantityNum(0);
    else setQuantityNum(+inputValue);
  }, [inputValue]);

  // Neu so luong stock con laij
  useEffect(() => {
    const productIndex = cart.items.findIndex(
      (item) => item._id === product._id
    );

    if (
      quantityNum + (cart.items[productIndex]?.quantity || 0) >
      product.stock
    ) {
      setIsDisable(true);
      setIsIncrDisable(true);
    } else if (
      quantityNum + (cart.items[productIndex]?.quantity || 0) ===
      product.stock
    ) {
      setIsIncrDisable(true);
    } else {
      setIsDisable(false);
      setIsIncrDisable(false);
    }
  }, [quantityNum, product, cart]);

  // Neu product thay doi
  useEffect(() => {
    setSuccess(false);
    setQuantityNum(1);
  }, [product]);

  return (
    <div className="detailInfo">
      {/* Name */}
      <h2 className="detailInfoTitle">{product.name}</h2>
      {/* Price */}
      <p className="detailInfoPrice">{price}</p>
      {/* Short Desc */}
      <p className="detailInfoDesc">{product.short_desc}</p>
      {/* Category */}
      <p className="detailInfoCate">
        category:
        <span>{product.category}</span>
      </p>

      {/* Stock */}
      <p className="detailInfoStock">In Stock: {product.stock}</p>

      {/* Quantity */}
      <div className="detailInfoQuantity">
        <input
          type="number"
          placeholder="quantity"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="detailInfoQuantityNum">
          <button
            className="navBtn"
            onClick={(e) => {
              e.preventDefault();
              setQuantityNum((prevState) => {
                if (+prevState === 1) return prevState;
                return +prevState - 1;
              });
            }}
          >
            <i className="fa-solid fa-caret-left"></i>
          </button>
          <span>{quantityNum}</span>
          <button
            className="navBtn"
            onClick={(e) => {
              e.preventDefault();
              setQuantityNum((prevState) => +prevState + 1);
            }}
            disabled={isIncrDisable}
          >
            <i className="fa-solid fa-caret-right"></i>
          </button>
        </div>
        <button
          className="primary-button detailInfoButton"
          onClick={addItemToCartHandler}
          disabled={isDisable}
        >
          Add to cart
        </button>
      </div>
      {/* Thong bao cho nguoi dung sau khi them vao kho hang */}
      {success && (
        <p style={{ color: 'green', marginTop: '0.5rem' }}>
          Add product to cart Successfully!
        </p>
      )}
      {product.stock === 0 && (
        <p style={{ color: 'red', marginTop: '0.5rem' }}>Out of Stock</p>
      )}
    </div>
  );
};

export default DetailInfo;
