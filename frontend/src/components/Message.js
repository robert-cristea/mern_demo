import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Message() {
  const { message } = useSelector((state) => state.message);
  if (!message) return;
  
  toast.success("Password updated successful!");

  return <div>{message}</div>;
}
