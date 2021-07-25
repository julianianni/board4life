/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";

import navbarChange from "../utils/navbarChange";
import { removeUser } from "../state/user";
import { removeCart } from "../state/cart";
import { counterProducts } from "../state/Counter";

export default function Nav({ transparent = true }) {
  const user = useSelector(state => state.user);
  const counter = useSelector(state => state.counter);
  const cart = useSelector(state => state.cart);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(location);

  useEffect(() => {
    if (location.pathname === "/home") navbarChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cart.Products) dispatch(counterProducts(cart.Products.length));
  }, [cart]);

  const signOut = event => {
    event.preventDefault();
    axios
      .put("/api/auth/logout")
      .then(res => dispatch(removeUser()))
      .then(res => dispatch(removeCart()))
      .then(() => dispatch(counterProducts(0)))
      .then(res => history.push("/home"));
  };

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-dark amatic ${
          transparent ? `bg-trasparent fixed-top` : `bg-dark shadow`
        }`}
      >
        <div className="container-fluid">
          <img
            className="ms-4 mt-3"
            src="https://i0.wp.com/www.ecoledesurfmoliets.com/wp-content/uploads/2018/01/logo-surf.png?fit=288%2C288&ssl=1"
            alt="logo"
            width="60"
            height="60"
          />
          <Link className="nav-link active" to="/home">
            <h2 className="navbar-brand ms-1 my-0 fs-1">
              board<span style={{ color: "red", fontSize: "3.2rem" }}>4</span>
              life
            </h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end me-5 " id="navbarNav">
            <ul className="navbar-nav mt-2">
              <li className="nav-item nav-option mx-4 fs-3">
                <Link className="nav-link active " to="/home" onClick={() => window.scrollTo(0, 0)}>
                  Home
                </Link>
              </li>
              <li className="nav-item nav-option mx-4 my-auto fs-3">
                <a className="nav-link active " href="/home#aboutUs">
                  About Us
                </a>
              </li>
              <li className="nav-item nav-option mx-4 my-auto fs-3">
                <Link
                  style={{ color: "red" }}
                  className="nav-link active"
                  to="/shop"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Shop
                </Link>
              </li>
              {user.isAdmin && (
                <li className="nav-item nav-option mx-4 my-auto fs-3">
                  <Link
                    className="nav-link active"
                    to="/admin"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    ADMIN
                  </Link>
                </li>
              )}
              {user.id && !user.isAdmin && (
                <li className="nav-item nav-option mx-4 my-auto fs-3">
                  <Link
                    className="nav-link active"
                    to="/orders"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    My orders
                  </Link>
                </li>
              )}
              <li className="nav-item nav-option mx-4 my-auto fs-3">
                <Link
                  className="nav-link active"
                  to={`${user.id ? "/cart" : "/signin"}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="shop-counter d-flex flex-row-reverse">
                    {counter ? <div className="numberCircle">{counter}</div> : null}
                    <i className="bi bi-cart3"></i>
                  </div>
                </Link>
              </li>
              {!user.id ? (
                <li className="nav-item nav-option mx-4 my-auto fs-3">
                  <Link
                    className="nav-link active"
                    to="/signin"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Sign In
                  </Link>
                </li>
              ) : (
                <>
                  <li className="d-flex nav-item  ms-2 me-3">
                    <p className="nav-item my-auto active fs-4" style={{ color: "white" }} aria-current="page" to="/users">
                    {user.firstName}
                    </p>
                  </li>
                  <div className="flex-shrink-0 dropdown my-auto me-0">
                    <a
                      href="#"
                      className="d-block link-dark text-decoration-none dropdown-toggle"
                      id="dropdownUser2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="white"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow"
                      aria-labelledby="dropdownUser2"
                    >
                      <li>
                        <button className="dropdown-item" onClick={signOut}>
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
