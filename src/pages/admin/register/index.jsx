import axios from "axios";
import style from "./index.module.css";
import {
  Formik,
  // FormikHelpers,
  // FormikProps,
  Form,
  Field,
  // FieldProps,
} from "formik";
function Register() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  return (
    <>
      <div className={style.loginPages}>
        <div className={style.left}>
          <div className={style.logo}>{/* <img src={logo} alt="" /> */}</div>
          <div className={style.title}>
            <h1>
              The Easiest Way to Create Events and Sell More Tickets Online
            </h1>
          </div>
        </div>
        <div className={style.right}>
          <div>
            <h1>Register</h1>
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
                      navigator("/");
                    }
                  });
              }}
            >
              <Form>
                <label htmlFor="firstName">First Name</label>
                <Field
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                />
                <br />
                <label htmlFor="lastName">Last Name</label>
                <Field id="lastName" name="lastName" placeholder="Last Name" />
                <br />
                <label htmlFor="email">Your Email</label>
                <Field id="email" name="email" placeholder="Your Email" />
                <br />
                <label htmlFor="email">Password</label>
                <Field id="password" name="password" placeholder="Password" />
                <br />
                <button type="submit">Submit</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
