import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

const theme = createTheme();

function LoginForm() {
  type InitialValues = {
    email: string;
    password: string;
  };
  const initialValues: InitialValues = {
    email: "",
    password: "",
  };
  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .email("Try: andrea@gmail.com")
      .required("Please enter your e-mail address"),
    password: Yup.string()
      .required("Please enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        "Try: SecurePassword34"
      ),
  });

  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#495a64" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={FormSchema}
              onSubmit={(values) => {
                axios
                  .post("http://localhost:8001/users/login", values)
                  .then(() => {
                    navigate("/user");
                  });
              }}
            >
              {({ errors, touched, handleChange }) => {
                return (
                  <Form>
                    <Box>
                      <TextField
                        margin="normal"
                        id="filled-basic"
                        label="Email"
                        variant="filled"
                        name="email"
                        onChange={handleChange}
                        autoComplete="email"
                        autoFocus
                      />
                      {errors.email && touched.email ? (
                        <Typography className="error-message">
                          {errors.email}
                        </Typography>
                      ) : null}
                    </Box>
                    <Box>
                      <TextField
                        id="filled-basic"
                        label="Password"
                        variant="filled"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        autoComplete="email"
                        autoFocus
                      />
                      {errors.password && touched.password ? (
                        <Typography className="error-message">
                          {errors.password}
                        </Typography>
                      ) : null}
                    </Box>
                    <Button type="submit" color="primary" className="button">
                      Log in
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginForm;
