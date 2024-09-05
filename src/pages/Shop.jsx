import BreadCrumb from '../components/Layouts/BreadCrumb.jsx';
import Sidebar from '../components/ShopPage/Sidebar.jsx';
import ProductList from '../components/ShopPage/ProductList.jsx';

const ShopPage = () => {
  return (
    <>
      <BreadCrumb title="shop" URL="shop" />
      <main>
        <div className="container">
          <div className="row">
            <div className="col-5 col-md-3">
              <Sidebar />
            </div>

            <div className="col-7 col-md-9">
              <ProductList />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ShopPage;
