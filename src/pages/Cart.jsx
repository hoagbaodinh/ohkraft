import Cart from "../components/CartPage/Cart";
import CartTotal from "../components/CartPage/CartTotal";
import BreadCrumb from "../components/Layouts/BreadCrumb";

const CartPage = () => {
  return (
    <>
      <BreadCrumb title="cart" URL="cart" />
      <main>
        <div className="container">
          <h2 className="cartTitle">shopping cart</h2>
          <div className="row">
            <div className="col-8">
              <Cart />
            </div>

            <div className="col-4">
              <CartTotal />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CartPage;
