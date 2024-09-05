const { createSlice, configureStore } = require('@reduxjs/toolkit');

// Slice dieu khien state category
const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    category: 'all',
  },
  reducers: {
    changeCate(state, action) {
      state.category = action.payload;
    },
  },
});

// Slice dieu khien cart
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    // Thay the cart
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    // Them Item vao cart
    addItemToCart(state, action) {
      // Lay gia tri cua item truyen vao
      const newItem = action.payload;

      // Kiem tra item da ton tai hay chua
      const existingItem = state.items.find((item) => item._id === newItem._id);
      // Tang so luong tong item co trong cart
      state.totalQuantity += +newItem.quantity;
      // Neu item chua co trong cart
      if (!existingItem) {
        // Them item vao cart
        state.items.push({
          _id: newItem._id,
          image: newItem.image,
          price: +newItem.price,
          quantity: +newItem.quantity,
          totalPrice: +newItem.price * +newItem.quantity,
          title: newItem.title,
          stock: newItem.stock,
        });
      } else {
        // Neu item da co trong cart
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice =
          +existingItem.totalPrice + +newItem.price * +newItem.quantity;
      }
    },
    //Xoa 1 item trong cart
    removeItemFromCart(state, action) {
      // Nhan id
      const _id = action.payload;
      //Tim item trong cart
      const existingItem = state.items.find((item) => item._id === _id);

      state.totalQuantity--;
      // Neu so luong dang la 1 thi xoa item khoi cart
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item._id !== _id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
    // Xoa item ra khoi cart
    deleteItemFormCart(state, action) {
      //Nhan id tu payload
      const _id = action.payload;
      // Tim item
      const existingItem = state.items.find((item) => item._id === _id);
      // Update tong so sp co trong cart
      state.totalQuantity -= existingItem.quantity;
      // Loc item ra khoi cart
      state.items = state.items.filter((item) => item._id !== _id);
    },
  },
});
// Store
const store = configureStore({
  reducer: {
    productList: productListSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
export const cartActions = cartSlice.actions;
export const productListActions = productListSlice.actions;
