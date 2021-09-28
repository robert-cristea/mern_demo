import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import authActions from "../redux/auth/actions";

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector((state) => state.auth);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
    username: yup
      .string()
      .min(4, "Username should be at least 4 characters")
      .required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, `Password has to be at least ${8} characters!`),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const { register, handleSubmit, reset, control, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;

  function onSubmit(data) {
    dispatch(authActions.register(data, history));
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                {...register("username")}
                id="username"
                name="username"
                type="text"
                className="form-control"
              />
              {errors.username?.message && (
                <div className="alert alert-danger" role="alert">
                  {errors.username.message}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                {...register("email")}
                id="email"
                name="email"
                type="text"
                className="form-control"
              />
              {errors.email?.message && (
                <div className="alert alert-danger" role="alert">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                className="form-control"
              />
              {errors.password?.message && (
                <div className="alert alert-danger" role="alert">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                {...register("confirmPassword")}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-control"
              />
              {errors.confirmPassword?.message && (
                <div className="alert alert-danger" role="alert">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  <span>Sign up</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
