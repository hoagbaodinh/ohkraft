import { useNavigate } from 'react-router-dom';

const RelatedPdsList = ({ products }) => {
  const http = process.env.REACT_APP_API;

  // Chuyen huong den san pham duoc click
  const navigate = useNavigate();
  const handleClick = (pd) => {
    navigate(`/detail/${pd._id}`);
    window.scrollTo({
      top: 300,
      left: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      {products.map((pd) => (
        <div className="col-3" key={pd._id}>
          <div className="pdItemContent">
            <img
              src={`${
                pd.img1.includes('http') ? pd.img1 : `${http}/images/${pd.img1}`
              }`}
              alt="pd item"
              className="pdItemImg"
              onClick={() => handleClick(pd)}
            />
            <p className="pdItemName" onClick={() => handleClick(pd)}>
              {pd.name}
            </p>
            <p className="pdItemPrice">{pd.price}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default RelatedPdsList;
