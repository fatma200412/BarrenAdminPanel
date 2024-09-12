import axios from "axios";
import logo from "../../../assets/images/login/sign-logo.svg";
import style from "./index.module.css";
import {
  Formik,
  // FormikHelpers,
  // FormikProps,
  Form,
  Field,
  // FieldProps,
} from "formik";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/system/Unstable_Grid";
import Swal from "sweetalert2";

function Register() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    city: "",
    addres: "",
    userType: 2,
  };
  const navigate = useNavigate();

  const handleRegisterSubmit = (values, actions) => {
    console.log(values);
    axios.post("http://localhost:5011/api/Auth/SignUp", values).then((res) => {
      {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration completed successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (res.status == 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration completed successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        // alert("Qeydiyyat tamamlandir");
        navigate("/");
        actions.resetForm();
      }
      navigate("/");
      actions.resetForm();
    });
  };
  return (
    <>
      <div className={style.registerPages}>
        <div className={style.left}>
          <div className={style.logo}>
            <img src={logo} alt="" />
          </div>
          <div className={style.title}>
            <h1>
              The Easiest Way to Create Events and Sell More Tickets Online
            </h1>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.signIn}>
            <p>
              Already have an account?
              <Link to="/login" className={style.link}>
                Sign Ip
              </Link>{" "}
            </p>
          </div>
          <div className={style.forms}>
            <h1>Sign up to Barren</h1>

            <Formik
              initialValues={initialValues}
              onSubmit={handleRegisterSubmit}
            >
              <Form className={style.form}>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6}>
                    <label htmlFor="firstName" className={style.label}>
                      First Name*
                    </label>
                    <Field
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      className={style.inp}
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <label htmlFor="lastName" className={style.label}>
                      Last Name*
                    </label>
                    <Field
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      className={style.inp}
                    />
                  </Grid>
                  <Grid xs={12} md={12}>
                    <label htmlFor="email" className={style.label}>
                      Your Email*
                    </label>
                    <Field
                      id="email"
                      name="email"
                      placeholder="Your Email"
                      className={style.inp}
                    />
                  </Grid>
                  <Grid xs={12} md={12}>
                    <label htmlFor="email" className={style.label}>
                      Password*
                    </label>
                    <Field
                      id="password"
                      name="password"
                      placeholder="Password"
                      className={style.inp}
                    />
                  </Grid>
                  <Grid xs={12} md={12}>
                    <label htmlFor="country" className={style.label}>
                      Your County*
                    </label>
                    <Field
                      id="county"
                      name="country"
                      placeholder="Your County"
                      className={style.inp}
                    />
                  </Grid>{" "}
                  <Grid xs={12} md={12}>
                    <label htmlFor="city" className={style.label}>
                      Your city*
                    </label>
                    <Field
                      id=""
                      name="city"
                      placeholder="Your City"
                      className={style.inp}
                    />
                  </Grid>{" "}
                  <Grid xs={12} md={12}>
                    <label htmlFor="addres" className={style.label}>
                      Your address*
                    </label>
                    <Field
                      id="address"
                      name="addres"
                      placeholder="Your Address"
                      className={style.inp}
                    />
                  </Grid>
                </Grid>

                <button type="submit">Sign Up</button>
                <p>
                  By clicking "Sign up", you agree to Barren{" "}
                  <Link to="/register" className={style.link}>
                    Terms & Conditions
                  </Link>
                  and have read the{" "}
                  <Link to="/register" className={style.link}>
                    Privacy Policy
                  </Link>{" "}
                  .
                </p>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
