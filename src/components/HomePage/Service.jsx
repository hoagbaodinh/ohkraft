const Service = () => {
  return (
    <section className="service">
      <div className="container">
        <div className="serviceContainer">
          <div className="row">
            <div className="col-4">
              <div className="serviceItem text-center">
                <i className="fa-solid fa-truck-fast"></i>
                <h1>Across the country</h1>
                <p>
                  The product will be delivered nationwide within 3-5 business
                  days
                </p>
              </div>
            </div>
            <div className="col-4">
              <div className="serviceItem text-center">
                <i className="fa-solid fa-headphones"></i>

                <h1>24 x 7 service</h1>
                <p>Our support team offers quick response</p>
              </div>
            </div>
            <div className="col-4">
              <div className="serviceItem text-center">
                <i className="fa-solid fa-tag"></i>

                <h1>festival offer</h1>
                <p>Discounts available for large quantities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
