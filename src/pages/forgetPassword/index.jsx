import style from "./index.module.css";
import logo from "../../assets/images/login/sign-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

function ForgetPassword() {
  const navigate = useNavigate(); // To navigate after password reset

  const initialValues = { email: "", newPassword: "", confirmPassword: "" };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.newPassword) {
      errors.newPassword = "New password is required";
    }
    if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword = "Passwords must match";
    }
    return errors;
  };

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
            <Link to="/login" className={style.link}>
              <FontAwesomeIcon icon={faCircleLeft} /> Back to sign in
            </Link>
          </p>
        </div>
        <div className={style.forms}>
          <h1>Reset Password</h1>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={(values, actions) => {
              axios("https://669b5625276e45187d352b89.mockapi.io/users")
                .then((res) => {
                  const users = res.data;
                  const user = users.find(
                    (user) => user.email === values.email
                  );

                  if (user) {
                    // Update the user's password
                    axios
                      .put(
                        `https://669b5625276e45187d352b89.mockapi.io/users/${user.id}`,
                        {
                          ...user,
                          password: values.newPassword,
                        }
                      )
                      .then(() => {
                        {
                          Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Password reset successfully",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                        }

                        navigate("/login");
                      })
                      .catch((error) => {
                        {
                          Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Failed to update password",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                        }
                        console.error("Error updating password:", error);
                      });
                  } else {
                    {
                      Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "User not found",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }
                  }
                })
                .catch((error) => {
                  {
                    Swal.fire({
                      position: "center",
                      icon: "error",
                      title: "Failed to fetch users",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                  console.error("Error fetching users:", error);
                });

              actions.setSubmitting(false);
            }}
          >
            {({ errors, touched }) => (
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
                {errors.email && touched.email && <div>{errors.email}</div>}

                <label htmlFor="newPassword" className={style.label}>
                  New Password*
                </label>
                <br />
                <Field
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="New Password"
                  className={style.inp}
                />
                {errors.newPassword && touched.newPassword && (
                  <div>{errors.newPassword}</div>
                )}

                <label htmlFor="confirmPassword" className={style.label}>
                  Confirm Password*
                </label>
                <br />
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className={style.inp}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div>{errors.confirmPassword}</div>
                )}

                <button type="submit">Reset Password</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
