import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Box } from "@mui/system";

export default function GoogleLogIn() {
  return (
    <Box>
      <h1>GoogleLogIn</h1>
      <Box
        style={{
          marginInline: "auto",

          width: "200px",
        }}
      >
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            console.log(credentialResponse);
            //send back to the backend side
            //method post
            //endpoint: http://localhost:8000/users/google-authenticate
            const url = "http://localhost:8000/users/google-authenticate";
            //send credential
            const credential = credentialResponse.credential;
            let res = await axios.post(url, { id_token: credential });
            if (res.status === 200) {
              console.log(res, "response from backend");
            } else {
              alert("Log in failed");
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </Box>
    </Box>
  );
}
