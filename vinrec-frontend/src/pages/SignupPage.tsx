import { Box, Container, Grid, Stack, TextField, Button } from "@mui/material"
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from "react-router-dom";
import AddressForm from "../components/form/AddressForm";

const useStyles = makeStyles({
  body: {
    position: 'fixed',
    boxShadow: '0px 1px 10px rgba(0,0,0,0.75)',
    borderRadius: '25px',
    width: '65% !important',
    left: '17% !important',
    height: '80% !important',
    overflow: 'scroll',
    
  },
  addressFormWrapper: {
    marginTop: '15px',
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    paddingTop: '15px',
  },
});

const SignupPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(e.currentTarget);
    console.log(formData.get("firstName") as string);
    const signUpInfo = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      address: {
        street: formData.get("address") as string,
        
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        zip: formData.get("zip") as string,
      }
    };
  };

  return (
    <Container className={classes.body}>
      <div className={classes.contentWrapper}>
        <h1 className={classes.titleWrapper}>Sign up</h1>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
            <Stack spacing={2}>
              <TextField required id="username" label="Username" name="username" />
              <TextField required id="password" label="Password" name="password" type="password" />
            </Stack>
            <div className={classes.addressFormWrapper}>
              {/* <AddressForm key="signup-address"/> */}
            </div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2,
                }}
              >
                Sign Up
            </Button>
          </Box>
        </div>
    </Container>
  )
};

export default SignupPage;