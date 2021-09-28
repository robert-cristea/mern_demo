import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import authActions from "../redux/auth/actions";

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),

    password: yup
      .string()
      .required("Password is required")
      .min(8, `Password has to be at least ${8} characters!`),
  });

  const { register, handleSubmit, reset, control, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;

  function onSubmit(data) {
    dispatch(authActions.login(data, history));
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <button type="submit" className="btn btn-primary btn-block">
              {/* <button className="btn btn-primary btn-block" disabled={loading}> */}
              {/* {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )} */}
              <span>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
