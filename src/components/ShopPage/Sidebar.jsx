import { useDispatch, useSelector } from 'react-redux';
import { productListActions } from '../../store';

const Sidebar = () => {
  // Lay category tu productListSlice
  const category = useSelector((state) => state.productList.category);
  // Dispatch
  const dispatch = useDispatch();

  // Click
  const handleClick = (cate) => {
    // Thay doi state voi muc vua click
    dispatch(productListActions.changeCate(cate));
    window.scrollTo(0, 300);
  };

  return (
    <div className="sidebar">
      <h2 className="sidebarTitle">categories </h2>
      <div className="sidebarContent">
        <div className="sidebarItem">
          <h2 className="sidebarItemHeader">oh'kraft</h2>
          <span
            className={`sidebarLink ${category === 'all' ? 'activeCate' : ''}`}
            onClick={() => handleClick('all')}
          >
            All
          </span>
        </div>

        <div className="sidebarItem">
          <h2>Main Product</h2>
          <div className="itemContent">
            <span
              className={`sidebarLink ${
                category === 'him' ? 'activeCate' : ''
              }`}
              onClick={() => handleClick('him')}
            >
              For Him
            </span>
            <span
              className={`sidebarLink ${
                category === 'her' ? 'activeCate' : ''
              }`}
              onClick={() => handleClick('her')}
            >
              For Her
            </span>
            <span
              className={`sidebarLink ${
                category === 'mac' ? 'activeCate' : ''
              }`}
              onClick={() => handleClick('mac')}
            >
              Mac
            </span>
          </div>
        </div>

        <div className="sidebarItem">
          <h2>Season</h2>
          <div className="itemContent">
            <span
              className={`sidebarLink ${
                category === 'xmas' ? 'activeCate' : ''
              }`}
              onClick={() => handleClick('xmas')}
            >
              Christmas
            </span>
            <span
              className={`sidebarLink ${
                category === 'valentine' ? 'activeCate' : ''
              }`}
              onClick={() => handleClick('valentine')}
            >
              Valentine
            </span>
            <span
              className={`sidebarLink ${
                category === 'tet' ? 'activeCate' : ''
              }`}
              onClick={() => handleClick('tet')}
            >
              Tet
            </span>
          </div>
        </div>
        <div className="sidebarItem">
          <h2>other</h2>
          <div className="itemContent">
            <span
              className={`sidebarLink ${
                category === 'necklace' ? 'activeCate' : ''
              }`}
              onClick={() => handleClick('necklace')}
            >
              Necklace
            </span>
            <span
              className={`sidebarLink ${
                category === 'gem' ? 'activeCate' : ''
              }`}
              onClick={() => handleClick('gem')}
            >
              Gem
            </span>
            <span
              className={`sidebarLink ${
                category === 'other' ? 'activeCate' : ''
              }`}
              onClick={() => handleClick('other')}
            >
              Other
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
