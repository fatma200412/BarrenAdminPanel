import style from "./index.module.css";
import logo from "../../../assets/images/login/sign-logo.svg";
import {
  Formik,
  // FormikHelpers,
  // FormikProps,
  Form,
  Field,
  // FieldProps,
} from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/adminSlice";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const initialValues = { email: "", password: "" };
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(isLogin);
  return (
    <div className={style.loginPages}>
      <div className={style.left}>
        <div className={style.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={style.title}>
          <h1>The Easiest Way to Create Events and Sell More Tickets Online</h1>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.signUp}>
          <p>
            New to Barren?{" "}
            <Link to="/register" className={style.link}>
              Sign Up
            </Link>{" "}
          </p>
        </div>
        <div className={style.forms}>
          <h1>Sign in to Barren</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              console.log(values.email);
              axios("https://669b5625276e45187d352b89.mockapi.io/users").then(
                (res) => {
                  let data = res.data;
                  let userFound = false;
                  for (let user of data) {
                    if (
                      user.email == values.email &&
                      user.password == values.password
                    ) {
                      userFound = true;
                      dispatch(login(user));
                      navigate("/admin");
                      break;
                    }
                    if (!userFound) {
                      console.log("sifre veya istifadeci adi yalnisdir");
                    }
                  }
                }
              );
            }}
          >
            <Form className={style.form}>
              <label htmlFor="email" className={style.label}>
                Your Email*
              </label>
              <br />
              <Field
                id="email"
                name="email"
                placeholder="Your Email"
                className={style.inp}
              />
              <br />
              <div className={style.labelAndForget}>
                <label htmlFor="password" className={style.label}>
                  Password*
                </label>
                <Link to="/forgetpass" className={style.forgetPass}>
                  Forget Password?
                </Link>
              </div>
 
              <Field
                id="password"
                name="password"
                placeholder="Password"
                className={style.inp}
              />
              <br />
              <button type="submit">
                Sign In <FontAwesomeIcon icon={faRightToBracket} />
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
