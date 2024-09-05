const DetailDescription = ({ product }) => {
  return (
    <section className="detailDesc">
      <h2 className="detailDescTitle">Description </h2>
      <h3 className="detailDescSubtitle">product description</h3>

      <p className="detailDescNote">{product.long_desc}</p>
    </section>
  );
};

export default DetailDescription;
