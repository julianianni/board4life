import React from "react";

export default function Carroussel() {
  return (
    <div id="carousel" className="carousel slide carousel-fade zindex-dropdown" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://images.unsplash.com/photo-1539112079624-523816e94ef4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&h=730&q=80"
            className="d-block w-100"
            alt="..."
            style={{ width: "auto", height: "100vh" }}
          />
          {/* <div class="carousel-caption d-none d-md-block">
            <h2>First slide label</h2>
            <h4>Some representative placeholder content for the first slide.</h4>
          </div> */}
        </div>
        <div className="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1516173124899-0e420692b06c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&h=730&q=80"
            className="d-block w-100"
            alt="..."
            style={{ width: "auto", height: "100vh"}}
          />
          {/* <div  class="carousel-caption d-none d-md-block">
            <h2>First slide label</h2>
            <h4>Some representative placeholder content for the first slide.</h4>
          </div> */}
        </div>
        <div className="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1541234465457-7930d040edeb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&h=730&q=80"
            className="d-block w-100"
            alt="..."
            style={{ width: "auto", height: "100vh" }}
          />
        </div>
      </div>
    </div>
  );
}
