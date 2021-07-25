import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { message } from "antd";
import Navbar from "../components/Navbar";

export default function SignUp() {
  const [input, setInput] = useState({
    isAdmin: false,
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const history = useHistory();

  const [err, setErr] = useState({
    messengerPassWord: "",
    messengerEmail: "",
    messengerName: "",
    messengerLastName: "",
    value: false,
  });

  console.log(err);

  //// VALIDACIONES ///////////////////

  const validationPass = () => {
    if (input.password.length < 8) {
      setErr({
        ...err,
        messengerPassWord: "the password must be 8 characters",
        value: true,
      });
    } else {
      setErr({
        ...err,
        messengerPassWord: "",
        value: false,
      });
    }
  };

  // const validatorName = () => {
  //   if (input.firstName.length == 0) {
  //     setErr({ ...err, messengerName: "ingresa su nombre" });
  //   } else {
  //     setErr({ ...err, messengerName: "" });
  //   }
  // };

  // const validatorLastName = () => {
  //   if (input.lastName.length == 0) {
  //     setErr({
  //       ...err,
  //       messengerLastName: "ingresa su apellido ",
  //       value: true,
  //     });
  //   } else {
  //     setErr({ ...err, messengerLastName: "" });
  //   }
  // };

  const changeHandler = (event) => {
    const { target } = event;
    setInput({ ...input, [target.name]: target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    return axios
      .post("/api/auth/register", input)
      .then(() => message.success('Succesfully Registered', 1))
      .then((res) => history.push("/signin"))
      .catch((err) => message.error("email already in use", 1 ));
  };

  return (
    <div>
      <Navbar transparent={false} />
      <div className="container-fluid py-4 d-grid gap-3  d-flex justify-content-center">
        <div className="col-4 bg-light border align-center p-3">
          <h1 className="text-center">Register</h1>
          <form
            className="form-style justify-content-between"
            onChange={changeHandler}
            onSubmit={submitHandler}
          >
            <div className="mb-2">
              <label htmlFor="firstname" className="form-label  fs-6">
                First name *
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstName"
                value={input.fisrtName}
                required
                // onBlur={validatorName}
                // onKeyUp={validatorName}
              />
              {err.messengerName ? <p>{err.messengerName}</p> : null}
            </div>
            <div className="mb-2">
              <label htmlFor="lastName" className="form-label  fs-6">
                Last name *
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={input.lastName}
                required
                // onBlur={validatorLastName}
                // onKeyUp={validatorLastName}
              />
              {err.messengerLastName ? <p>{err.messengerLastName}</p> : null}
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="form-label  fs-6">
                Email *
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={input.email}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="InputPassword" className="form-label  fs-6">
                Password *
              </label>
              <input
                type="password"
                className="form-control"
                id="InputPassword"
                name="password"
                value={input.password}
                onBlur={validationPass}
                onKeyUp={validationPass}
                required
              />
              {err.messengerPassWord ? (
                <p className="fs-5" style={{ color: "#F34423" }}>
                  {err.messengerPassWord}
                </p>
              ) : null}
            </div>
            <button
              type="submit"
              className="btn btn-dark mt-4"
              disabled={err.value}
            >
              Submit
            </button>
            <Link
              style={{ color: "red" }}
              className="nav-link active text-center"
              to="/signin"
            >
              Back to login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
