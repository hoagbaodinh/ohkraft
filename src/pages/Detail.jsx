import { useParams } from 'react-router-dom';
import BreadCrumb from '../components/Layouts/BreadCrumb';
import DetailImgs from '../components/DetailPage/DetailImgs';
import DetailInfo from '../components/DetailPage/DetailInfo';
import DetailDescription from '../components/DetailPage/DetailDescription';
import RelatedPds from '../components/DetailPage/RelatedPds';
import useFetch from '../hooks/useFetch';
import { useEffect } from 'react';

const DetailPage = () => {
  // Lay product co id
  const { detailId } = useParams();
  const { data, loading, reFetch } = useFetch(
    'products/get-product/' + detailId
  );

  useEffect(() => {
    reFetch();
    // eslint-disable-next-line
  }, [detailId]);

  return (
    <>
      <BreadCrumb title="Detail" URL="detail" />
      <section className="detailProduct">
        <div className="container">
          {loading
            ? 'Loading...'
            : data && (
                <>
                  <div className="row">
                    <div className="col-6">
                      {!loading && <DetailImgs product={data} />}
                    </div>

                    <div className="col-6">
                      <DetailInfo product={data} />
                    </div>
                  </div>

                  <DetailDescription product={data} />

                  <RelatedPds product={data} />
                </>
              )}
        </div>
      </section>
    </>
  );
};

export default DetailPage;
