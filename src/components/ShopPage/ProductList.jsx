// import { useState } from "react";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductListItem from './ProductListItem';
import { AnimatePresence } from 'framer-motion';
import useFetch from '../../hooks/useFetch';
import formatPrice from '../../util/format-price';

const ProductList = () => {
  const [pageNum, setPageNum] = useState(1);
  const [productsIsShowing, setProductsIsShowing] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const cateIsShowing = useSelector((state) => state.productList.category);

  const {
    data: { products, totalProducts },
    loading,
    reFetch,
  } = useFetch(
    `products/get-products-by-cate?cate=${cateIsShowing}&page=${pageNum}`
  );

  useEffect(() => {
    setPageNum(1);
    reFetch();
    // eslint-disable-next-line
  }, [cateIsShowing]);
  useEffect(() => {
    reFetch();
    window.scrollTo(0, 300);
    // eslint-disable-next-line
  }, [pageNum]);

  useEffect(() => {
    if (searchInput !== '')
      setProductsIsShowing((prev) =>
        prev.map((item) =>
          item?.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    else setProductsIsShowing(products);
  }, [searchInput, products]);

  useEffect(() => {
    products &&
      setProductsIsShowing(
        products?.map((p) => ({ ...p, price: formatPrice(p.price) }))
      );
  }, [products]);
  return (
    <div className="productList">
      <div className="pdListTop">
        <input
          type="text"
          className="pdListSearch"
          placeholder="Enter Search Name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {/* 
        <select name="sort" className="pdListSort">
          <option value="Default Sorting">Default Sorting</option>
          <option value="From Lowest">From Lowest</option>
          <option value="From Highest">From Highest</option>
        </select> */}
      </div>

      <div className="pdListContent">
        <div className="row">
          <AnimatePresence>
            {loading ? (
              'Loading...'
            ) : (
              <>
                {productsIsShowing?.map((product) => (
                  <ProductListItem product={product} key={product.name} />
                ))}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="pdListPageNav">
        <div className="pageNavBtns">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (pageNum <= 1) return;
              else return setPageNum((prev) => (prev -= 1));
            }}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
          <input
            type="text"
            className={`pageNum ${
              productsIsShowing?.length === 0 ? 'd-none' : ''
            }`}
            value={pageNum}
            onChange={(e) => setPageNum(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (pageNum >= totalProducts / 9) return;
              else return setPageNum((prev) => (prev += 1));
            }}
          >
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </div>

        <p className="pageNavDescription">{`Showing ${(pageNum - 1) * 9 + 1}-${
          (pageNum - 1) * 9 + productsIsShowing?.length
        } of ${totalProducts || 0} results`}</p>
        <p></p>
      </div>
    </div>
  );
};

export default ProductList;
