import { useNavigate } from 'react-router-dom';
import cate1 from '../../assets/christmas-theme.jpg';
import cate2 from '../../assets/valentine-theme.jpg';
import cate3 from '../../assets/gem-theme.png';
import cate4 from '../../assets/necklace-theme.png';
import cate5 from '../../assets/seashell-theme.jpg';
import { productListActions } from '../../store';
import { useDispatch } from 'react-redux';

const Categories = () => {
  const navigate = useNavigate();
  // Dispatch
  const dispatch = useDispatch();

  // Click
  const handleClick = (cate) => {
    // Thay doi state voi muc vua click
    dispatch(productListActions.changeCate(cate));
    navigate('/shop');
    window.scrollTo(0, 300);
  };

  return (
    <section className="categories">
      <div className="container">
        <div className="section-title ">
          <p>carefully created collections</p>
          <h1>browse our categories</h1>
        </div>

        <div className="cateContent">
          <div className="row">
            <div className="col-6 cateItem">
              <img src={cate1} alt="xmas" onClick={() => handleClick('xmas')} />
            </div>
            <div className="col-6 cateItem">
              <img src={cate2} alt="all" onClick={() => handleClick('all')} />
            </div>
            <div className="col-4 cateItem">
              <img src={cate3} alt="gem" onClick={() => handleClick('gem')} />
            </div>
            <div className="col-4 cateItem">
              <img
                src={cate4}
                alt="necklace"
                onClick={() => handleClick('necklace')}
              />
            </div>
            <div className="col-4 cateItem">
              <img
                src={cate5}
                alt="shell"
                onClick={() => handleClick('shell')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
