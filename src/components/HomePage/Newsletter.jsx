const Newsletter = () => {
  return (
    <section className="newsletter">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="section-title newsletterTitle">
              <h1>let's be friends!</h1>
              <p>Nisi nisi tempor consequat laporis nisi.</p>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-9 p-0">
                <input
                  type="text"
                  placeholder="Enter your email address"
                  className="newsletterInput"
                />
              </div>
              <div className="col-3 p-0">
                <button className="newsletterButton" type="button">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
