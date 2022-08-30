import React, { useEffect, useState } from 'react';
import { Box, Container, Stack, TextField, Button, Grid, Link, AlertColor } from "@mui/material"
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useStateContext } from "../contexts/ContextProvider";
import useAxios from 'axios-hooks';
import axios from 'axios';
import SnackbarCustom from '../components/SnackbarCustom';

const useStyles = makeStyles({
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    padding: '25px',
    boxShadow: '0px 1px 10px rgba(0,0,0,0.75)',
    borderRadius: '25px',
  }
});

const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { token, setToken, setIsLoggedIn } = useStateContext();
  const [ snackbar, setSnackbar ] = useState(
    {
      open: false,
      message: '',
      severity: 'success'
    }
  );

  const [{ data, loading, error }, logIn] = useAxios({
    url: `${process.env.REACT_APP_BASE_URL}/Authentication/login`,
    method: "POST"
  },
  { manual: true });

  useEffect(() => {
    if (data) {
      setSnackbar({
        open: true,
        message: 'Logged in successfully',
        severity: 'success'
      });

      setToken(data);
      localStorage.setItem("token", data);
      console.log(data);
      setIsLoggedIn(true);
      navigate("/");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message: `${error?.response?.data}`,
        severity: 'error'
      });
      console.log(error?.response?.data);
    }
  } , [error]);

  const handleCloseSnackbar = () => {
    setSnackbar(prevValue => ({
      open: false,
      message: prevValue.message,
      severity: prevValue.severity
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await logIn({
      data: {
        username: formData.get("username") as string,
        password: formData.get("password") as string
      }
    });
  };

  return (
    <Box className={classes.body} >
      { loading ?
        (<Loading/>)
        :
        (
      <Box className={classes.cardContainer}>
        <h1>Welcome to Vinrec</h1>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
          <Stack spacing={3}>
            <TextField required id="username" label="Username" name="username" variant="standard" />
            <TextField required id="password" label="Password" name="password" variant="standard" type="password" />
            {/* <Button type="submit" content="Log in" /> */}
          </Stack>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
          </Button>
          <Grid container spacing={3}>
            <Grid item>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>)}
      <SnackbarCustom 
        open={snackbar.open} 
        message={snackbar.message} 
        handleClose={handleCloseSnackbar}
        severity={snackbar.severity as AlertColor}
      />
    </Box>
  )
};

export default LoginPage;