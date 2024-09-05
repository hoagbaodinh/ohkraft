import ProductItem from './ProductItem';
import formatPrice from '../../util/format-price';
import useFetch from '../../hooks/useFetch';

const Products = () => {
  // Lay du lieu Products
  const { data, loading } = useFetch('products/products-index');

  return (
    <section className="trendingProducts">
      <div className="container">
        <div className="section-title trendingPdTitle">
          <p>made it hard way</p>
          <h1>top trending products</h1>
        </div>

        <div className="pdContent">
          <div className="row">
            {loading ? (
              'Loading...'
            ) : (
              <>
                {data?.map((prd) => (
                  <ProductItem
                    key={prd?.name}
                    product={{ ...prd, price: formatPrice(prd.price) }}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
