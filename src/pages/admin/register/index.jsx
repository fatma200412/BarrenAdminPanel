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

function Register() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: "",
    address: {
      county: "",
      city: "",
      address: "",
    },
  };
  const navigate = useNavigate();
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
              onSubmit={(values, actions) => {
                console.log(values);
                axios
                  .post(
                    "https://669b5625276e45187d352b89.mockapi.io/users",
                    values
                  )
                  .then((res) => {
                    if (res.status == 200) {
                      alert("qey tamamlandir");
                      navigate("/");
                      actions.resetForm();
                    }
                    navigate("/");
                    actions.resetForm();
                  });
              }}
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
                    <label htmlFor="image" className={style.label}>
                      Profil Image*
                    </label>
                    <Field
                      id="image"
                      name="image"
                      placeholder="Your Profil Image"
                      className={style.inp}
                    />
                  </Grid>{" "}
                  <Grid xs={12} md={12}>
                    <label htmlFor="county" className={style.label}>
                      Your County*
                    </label>
                    <Field
                      id="county"
                      name="address.county"
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
                      name="address.city"
                      placeholder="Your City"
                      className={style.inp}
                    />
                  </Grid>{" "}
                  <Grid xs={12} md={12}>
                    <label htmlFor="address" className={style.label}>
                      Your address*
                    </label>
                    <Field
                      id="address"
                      name="address.address"
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
