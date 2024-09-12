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
import Swal from "sweetalert2";
import { AdminAuth } from "../../../context/adminAuth";
import { useContext } from "react";

function Login() {
  const initialValues = { email: "", password: "" };
  // const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setIsLoginAdmin, setUserRole } = useContext(AdminAuth);

  const handleLogin = (values) => {
    axios
      .post("http://localhost:5011/api/Auth/SignIn", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const {
          token,
          roles,
          firstName,
          lastName,
          email,
          country,
          city,
          addres,
        } = res.data.result;
        if (token) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Logging in",
            showConfirmButton: false,
            timer: 1500,
          });
          const userInfo = {
            token,
            roles,
            firstName,
            lastName,
            email,
            country,
            city,
            addres,
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));

          dispatch(login(userInfo));

          setIsLoginAdmin(true);
          let userRole = JSON.parse(localStorage.getItem("userInfo")).roles;
          console.log("userRole", userRole);
          setUserRole(userRole);

          localStorage.setItem("isLoginAdmin", true);
          localStorage.setItem("userRole", JSON.stringify(userRole.join(",")));

          navigate("/admin");
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Password or username is incorrect",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "An error occurred",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  // console.log(isLogin);
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
              handleLogin(values);
              // axios
              //   .post("http://localhost:5011/api/Auth/SignIn", values, {
              //     headers: {
              //       "Content-Type": "application/json",
              //     },
              //   })
              //   .then((res) => {
              //     const { token, roles } = res.data.result;
              //     console.log(res.data.result);
              //     if (token) {
              //       Swal.fire({
              //         position: "center",
              //         icon: "success",
              //         title: "Logging in",
              //         showConfirmButton: false,
              //         timer: 1500,
              //       });
              //       localStorage.setItem("token", token);
              //       localStorage.setItem("roles", roles);
              //       dispatch(login({ email: values.email, roles }));
              //       navigate("/admin");
              //     } else {
              //       Swal.fire({
              //         position: "center",
              //         icon: "error",
              //         title: "Password or username is incorrect",
              //         showConfirmButton: false,
              //         timer: 1500,
              //       });
              //     }
              //     // let data = res.data;
              //     // let userFound = false;
              //     // for (let user of data) {
              //     //   if (
              //     //     user.email == values.email &&
              //     //     user.password == values.password
              //     //   ) {
              //     //     Swal.fire({
              //     //       position: "center",
              //     //       icon: "success",
              //     //       title: "Logging in",
              //     //       showConfirmButton: false,
              //     //       timer: 1500,
              //     //     });
              //     //     userFound = true;
              //     //     dispatch(login(user));
              //     //     navigate("/admin");
              //     //     break;
              //     //   }
              //     //   if (!userFound) {
              //     //     {
              //     //       Swal.fire({
              //     //         position: "center",
              //     //         icon: "error",
              //     //         title: "Password or username is incorrect",
              //     //         showConfirmButton: false,
              //     //         timer: 1500,
              //     //       });
              //     //     }
              //     //     console.log("sifre veya istifadeci adi yalnisdir");
              //     //   }
              //     // }
              //   })
              //   .catch((error) => {
              //     console.error(
              //       "Login failed:",
              //       error.response?.data || error.message
              //     );
              //     if (error.response?.data?.errors) {
              //       console.error(
              //         "Validation errors:",
              //         error.response.data.errors
              //       );
              //     }
              //     Swal.fire({
              //       position: "center",
              //       icon: "error",
              //       title: "An error occurred",
              //       showConfirmButton: false,
              //       timer: 1500,
              //     });
              //   });
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
