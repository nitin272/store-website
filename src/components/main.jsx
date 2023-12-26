import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div
          className="card bg-dark text-white border-0 mx-3"
          style={{ position: "relative" }}
        >
          <img
            className="card-img img-fluid"
            src="./assets/main.png.jpg"
            alt="Card"
            height={500}
            style={{ objectFit: "cover" }}
          />
          <div
            className="card-img-overlay d-flex align-items-center"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <div className="container text-center text-white">
              <h5 className="card-title fs-1 text fw-lighter">Shop Now</h5>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
