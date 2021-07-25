import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ShopHeader from "../components/ShopHeader";
import ShopCategorizer from "../components/ShopCategorizer";
import Card from "../components/Card";

import { useSelector } from "react-redux";
import { getProducts, getAllCategoriesfromBD } from "../utils/index";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  console.log('categorias', cats);
  console.log('prod', products);
  const query = new RegExp(
    useSelector(state => state.query),
    "i"
  );
  useEffect(() => {
    getProducts().then(products => setProducts(products));
    getAllCategoriesfromBD().then(cats => setCats(cats));
  }, []);
  return (
    <>
      <Navbar transparent={false} />
      <ShopHeader />
      <div className="container-fluid bg-dark pt-3 pb-5">
        <div className=" d-flex row justify-content-center pb-5">
          <div className="col-3 pt-3 fs-3 pb-5">
            <div className="list-group list-group-flush amatic">
              {cats.map(cat => {
                return (
                  <Link
                    className="list-group-item bg-dark text-white text-center"
                    to={`/shop/${cat.name}`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="col-9 bg-light pb-5">
            <div className="row d-flex justify-content-start pt-3 mx-5">
              <Switch>
                <Route
                  exact
                  path="/shop"
                  render={() =>
                    Object.keys(products)
                      .filter(names => names.match(query))
                      .map((product, index) => (
                        <Card item={product} key={index} products={products} />
                      ))
                  }
                />
                <Route
                  exact
                  path="/shop/:category"
                  render={({ match }) => {
                    return <ShopCategorizer match={match} products={products} query={query} />
                  }}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
