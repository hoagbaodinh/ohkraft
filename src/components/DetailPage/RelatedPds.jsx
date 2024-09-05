import useFetch from '../../hooks/useFetch';
import formatPrice from '../../util/format-price';
import RelatedPdsList from './RelatedPdsList';

const RelatedPds = ({ product }) => {
  // Lay du lieu cua tat ca products
  const { data, loading } = useFetch(
    'products/related?cate=' + product.category
  );

  return (
    <div className="relatedPds">
      <h2>Related Products</h2>
      <div className="relatedPdsContent">
        <div className="row">
          {loading ? (
            'Loading...'
          ) : (
            <RelatedPdsList
              products={data.map((pd) => ({
                ...pd,
                price: formatPrice(pd.price),
              }))}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedPds;
