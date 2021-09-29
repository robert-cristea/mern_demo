import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import authService from "../services/auth.service";

export default function VerifyEmail(props) {
  // const { token } = useParams();
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log(`VerifyEmail->useEffect`, token);
    accountVerify(token);
  }, []);

  async function accountVerify(token) {
    try {
      const { data } = await authService.verifyEmail(token);
      console.log(`VerifyEmail:data`, data);

      setVerified(true);
    } catch (error) {
      console.log(`VerifyEmail:error`, error);

      setError();
    }
  }

  if (verified) {
    return (
      <div>
        <h5>Account email verified</h5>
        <p>
          Please <a href="/login">Login</a> to your account
        </p>
      </div>
    );
  }

  return null;
}
