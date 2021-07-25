import React from "react";
import { Link } from "react-router-dom";

export default function Info() {
  return (
    <div id="aboutUs" className="container-fluid bg-dark pt-5">
      <div className="row justify-content-center">
        <div className="col-10 my-5 bg-dark text-white rounded px-3 py-3">
          <h2 className="tituloAU">About us</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus perspiciatis non
            possimus magnam facilis reiciendis illo quibusdam, earum, aspernatur recusandae officia
            dolore excepturi quo at! Doloremque eos repellat adipisci iure Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Sunt cumque qui itaque tempora consequuntur,
            voluptates ut veniam nobis et pariatur dolores! Veniam dicta ab ducimus tempora! Aliquam
            dicta id repellat. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
            facilis totam, odit consequuntur quasi ad dolor, maxime aut fuga cum vero odio debitis!
            Dolore, suscipit quia. Atque perferendis dignissimos delectus.
          </p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-11">
          <div className="container-fluid d-flex justify-content-center cards">
            <Link to="/shop/Surf" onClick={() => window.scrollTo(0, 0)}>
              <div className="card card-option bg-dark text-white mx-0">
                <img
                  className="card-img zindex-tooltip"
                  src="https://images.unsplash.com/photo-1508792590781-4ffa8564db69?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&h=450&q=80"
                  alt="hoodies"
                />
                <div className="card-img-overlay d-flex justify-content-center align-items-end me-5 ">
                  <h1 className="card-title">SURF</h1>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-11">
          <div className="container-fluid d-flex justify-content-center cards">
            <Link to="/shop" onClick={() => window.scrollTo(0, 0)}>
              <div className="card card-option bg-dark text-white mx-0">
                <img
                  className="card-img zindex-tooltip"
                  src="https://images.unsplash.com/photo-1532649842991-60f6a04df35d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&h=450&q=80"
                  alt="hoodies"
                />
                <div className="card-img-overlay d-flex justify-content-center align-items-end me-5 ">
                  <h1 className="card-title">WEAR</h1>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-11">
          <div className="container-fluid d-flex justify-content-center cards">
            <Link to="/shop/Skateboarding" onClick={() => window.scrollTo(0, 0)}>
              <div className="card card-option bg-dark text-dark mb-5">
                <img
                  className="card-img zindex-tooltip"
                  src="https://images.unsplash.com/photo-1500347425655-9d404d89abdd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&h=400&q=80"
                  alt="hoodies"
                />
                <div className="card-img-overlay d-flex justify-content-center align-items-end me-5 ">
                  <h1 className="card-title">SKATE</h1>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
