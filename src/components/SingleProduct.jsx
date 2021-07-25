import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { getOneProduct } from "../utils/index";
import { addToCart } from "../state/cart";
import { counterProducts } from "../state/Counter";
import { addProductToCartBD } from "../utils/index";
import Navbar from "./Navbar";
import CounterButton from "./CounterButton";
import NavbarDescrip from "./../components/NavbarOfDescription";

function SingleProduct() {
  const param = useParams();
  const history = useHistory();
  //cart from redux
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  //states
  const [singleProduct, setSingleProduct] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [picture, setPicture] = useState([]);
  const [price, setPrice] = useState("");
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [stock, setStock] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [productToAdd, setProductToAdd] = useState("");
  const [counter, setCounter] = useState(1);
  const [selectImg, setSelectImg] = useState(0);
  const [selectInfo, setSelectInfo] = useState(0);

  useEffect(() => {
    getOneProduct(param.name)
      .then((products) => {
        setSingleProduct(products);
        return products;
      })
      .then((info) => {
        const { name, description, brand, picture, price, color } = info[0];
        setName(name);
        setDescription(description);
        setBrand(brand);
        setPicture(picture);
        setPrice(price);
      });
  }, []);

  useEffect(() => {
    singleProduct.map((product, index) => {
      if (index === 0) {
        setSelectedColor(product.color);
        setSelectedSize(product.size);
      }
      setSize((size) => [...size, product.size]);
      setSize((size) => [...new Set(size)]);
      setColor((color) => [...color, product.color]);
      setColor((color) => [...new Set(color)]);
      setStock((stock) => [...stock, product.stock]);
      setStock((stock) => [...new Set(stock)]);
    });
    console.log(color);
  }, [singleProduct, selectImg, selectInfo]);

  const addProduct = () => {
    let productToAdd = searchProductId();
    productToAdd = { ...productToAdd, quantity: counter, UserId: cart.UserId };
    addProductToCartBD(productToAdd).then((data) => {
      dispatch(counterProducts(cart.Products.length+1));
    });
  };

  const searchProductId = () => {
    const prod = singleProduct.filter((product) => {
      return product.color === selectedColor && product.size === selectedSize;
    });
    return prod[0];
  };

  //limpiar esta funcion
  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "color") {
      setSelectedColor(value);
      const AvailableSizes = singleProduct.reduce((acum, item) => {
        if (item.color === value) acum.push(item.size);
        return acum;
      }, []);
      setSize(AvailableSizes);
      setSize(AvailableSizes)
      setSelectedSize(AvailableSizes[0])
    }
    if (name === "size") {
      setSelectedSize(value);
      const AvailableColors = singleProduct.reduce((acum, item) => {
        if (item.size === value) acum.push(item.color);
        return acum;
      }, []);

      setColor(AvailableColors)
      setSelectedColor(AvailableColors[0])
    }
  };

  return (
    <div>
      <Navbar transparent={false} />
      <div className="container mb-5">
        <div className="row px-5 m-3">
          <div className="col-6 text-end px-5 py-3">
            <div className="row">
              <div className="col-3">
                {picture.map((picture, index) => (
                  <div
                    className="img-products my-2"
                    id={`imgLittle${index}`}
                    onClick={() => setSelectImg(index)}
                  >
                    <img src={picture} class="mw-100 " />
                  </div>
                ))}
              </div>
              <div className="col-9">
                <div>
                  <img src={picture[selectImg]} height="380" width="280" />
                </div>
              </div>
            </div>
            <div className="my-5">
              <NavbarDescrip description={description} />
            </div>
          </div>

          <div className="col-6 text-end  py-3 fs-3">
            <div>
              <h3 className='amatic fs-1'>
                <strong>{name}</strong>
              </h3>
              {/* <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star"></i> */}
            </div>
            <div className="my-5">
              <h2>
                <strong>${price}</strong>
              </h2>
            </div>
            <div className='py-3 d-flex flex-row-reverse fs-5'>
              <div>
                <p>Color</p>
                <div>
                  {/* {colors.map((color) => (
                  <i
                    id={color}
                    className={colorClass.empty}
                    style={{ color }}
                    onClick={(e) =>
                      changeOption(e.target, colors, colorClass, setColor)
                    }
                  ></i>
                ))} */}
                  <select
                    name="color"
                    onChange={handleChange}
                    id="color"
                    onLoad={handleChange}
                  >
                    {color.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='px-5'>
                <p>Size</p>
                <div>
                  {/* {talles.map((talle) => (
                  <i
                    id={talle}
                    className={talleClass.empty}
                    onClick={(e) =>
                      changeOption(e.target, talles, talleClass, setSize)
                    }
                  >
                    {talle}
                  </i>
                ))} */}
                  <select name="size" onChange={handleChange} id="size">
                    {size.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className='d-flex flex-row-reverse py-3'>
              <CounterButton setCounter={setCounter} counter={counter} />
            </div>

            <div className="my-3">
              <button
                className="btn btn-dark fs-5 mx-3"
                onClick={() => history.goBack()}
              >
                Go back
              </button>
              <button
                className="btn btn-warning fs-5"
                onClick={() => addProduct()}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
