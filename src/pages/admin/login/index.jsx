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

// interface MyFormValues {
//   firstName: string;
// }
function Login() {
  // const initialValues  = { firstName: "" };
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
        <div>
          <h1>LOgin</h1>
          <Formik
            initialValues={{ firstName: "" }}
            onSubmit={(values, actions) => {
              console.log({ values, actions });
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }}
          >
            <Form>
              <label htmlFor="firstName">First Name</label>
              <Field id="firstName" name="firstName" placeholder="First Name" />
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
