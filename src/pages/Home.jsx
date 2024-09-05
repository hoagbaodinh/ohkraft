import Banner from '../components/HomePage/Banner';
import Categories from '../components/HomePage/Categories';
import Products from '../components/HomePage/Products';
import Service from '../components/HomePage/Service';

const HomePage = () => {
  return (
    <main>
      {/* Banner */}
      <Banner />
      {/* Categories */}
      <Categories />
      {/* Danh sach product */}
      <Products />
      {/* Dich vu */}
      <Service />
      {/* Thu */}
      {/* <Newsletter /> */}
    </main>
  );
};

export default HomePage;
