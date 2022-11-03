import { Button, TextField } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../AccountSlice";

function Login() {

  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      phone: "",
    },
  });

  const submitForm = async (values) => {
    console.log("values: ", values);
    try {
      const action = login(values);
      const resultAction = dispatch(action);
      unwrapResult(resultAction);
    } catch (error) {
      console.log("failed to login: ", error);
    }

  };

  return (
    <>
    <h1>abc</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <TextField
          {...register("phone")}
          autoComplete="off"
          fullWidth
          label="Phone"
          variant="outlined"
          margin="normal"
          sx={{width: '50%', padding: 0}}
        />
        <Button type="submit">
          Sign in
        </Button>
      </form>
    </>
  );
}

export default Login;
