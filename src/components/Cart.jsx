import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Table from "./Table";
import Navbar from "./Navbar";
import { deleteProducFromCart } from "../state/cart";
import { clearCart } from "../utils/index";
import { getCart } from "../state/cart";
import ShopState from "./ShopState";
import { statusShopClass } from "./../utils/globals";
import { changeShopState } from "../utils/changeIcons";
import { counterProducts } from "../state/Counter";

function Cart() {
  let { cart } = useSelector((state) => state);
  let counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const deleteProduct = (user, item) => {
    const counterNew = counter - item.CartItem.quantity;
    dispatch(deleteProducFromCart({ userId: user, product: item }))
      .then(() => dispatch(getCart()))
      .then(() => dispatch(counterProducts(counterNew)));
  };

  useEffect(() => dispatch(getCart()), []);
  useEffect(() => {
    if (cart.Products && cart.Products.length !== 0)
      changeShopState({
        ...statusShopClass,
        id: "status01",
      });
  }, [dispatch, cart]);

  return (
    <div>
      <Navbar transparent={false} />
      <div className="m-5 p-3 text-center">
        <ShopState />
        <Table
          items={cart.Products}
          user={cart.UserId}
          deleteItem={deleteProduct}
        />
        {cart.Products && !cart.Products.length ? (
          <h1 className="text-center m-5">
            You have no products... <i class="bi bi-cart-x"></i>
          </h1>
        ) : (
          <div className="d-flex justify-content-evenly my-5">
            <button
              className="btn btn-dark fs-4"
              onClick={() => {
                clearCart(cart.UserId).then(() =>
                  dispatch(getCart()).then(() => dispatch(counterProducts(0)))
                );
              }}
            >
              Vaciar Carrito
            </button>
            <Link to="/checkout">
              <button className="btn btn-warning fs-4">Continuar</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
