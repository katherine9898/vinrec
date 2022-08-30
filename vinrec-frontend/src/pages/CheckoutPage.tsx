import { Box, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BillingForm from '../components/form/BillingForm';
import PaymentForm from '../components/form/PaymentForm';
import ShippingForm from '../components/form/ShippingForm';
import Loading from '../components/Loading';
import { useStateContext } from '../contexts/ContextProvider';
import { countries } from '../data/countries';

const useStyles = makeStyles({
  summaryTextWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  line: {
    borderTop: '1px solid #e0e0e0',
  },
  root: {
    "& .MuiStepLabel-root .Mui-active": { color: "black" },
    "& .MuiStepLabel-root .Mui-completed": { color: "black" },
  }
});

const steps = ['Shipping', 'Billing', 'Confirm Order'];

const defaultAddress = {
  firstName: '',
  lastName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  phoneNumber: '',
};


const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingFee, setShippingFee] = useState(15);
  const [tax, setTax] = useState(0);
  const [taxRate, setTaxRate] = useState(0.00);
  const classes = useStyles();
  const { cart, subtotal, handleResetCart } = useStateContext();
  const [total, setTotal] = useState(subtotal + shippingFee + tax);
  const [shippingAddress, setShippingAddress] = useState(defaultAddress);
  const [billingAddress, setBillingAddress] = useState(defaultAddress);
  const [email, setEmail] = useState('');
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/');
    }
  } ,[cart]);

  useEffect(() => {
    const allStates = countries.find((country: any) => country.name === shippingAddress.country)?.states;
    const rate = allStates?.find((state: any) => state.name === shippingAddress.state)?.taxRate || 0;
    setTaxRate(rate);
  } ,[shippingAddress]);

  useEffect(() => {
    const calculatedTax = Math.round(((subtotal * taxRate) + Number.EPSILON) * 100) / 100;
    setTax(calculatedTax);
  } ,[subtotal, taxRate]);

  useEffect(() => {
    setTotal(subtotal + shippingFee + tax);
  } ,[subtotal, shippingFee, tax]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleResetAfterPayment = () => {
    handleResetCart();
    setActiveStep(0);
    setShippingAddress(defaultAddress);
    setBillingAddress(defaultAddress);
    setEmail('');
    setIsSameAddress(false);
    setShippingFee(15);
    setTax(0);
    setTaxRate(0.00);
    setTotal(0);
  };

  return (
    <>
      {isLoading ?
        <Loading/> :
        <>
        <Typography variant="h4" >Checkout</Typography>
        <Grid container spacing={4} sx={{mt: 1}}>
          <Grid item xs={12} sm={8}>
              <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} className={classes.root}>
                  {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                      optional?: React.ReactNode;
                    } = {};
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                  <React.Fragment>
                    <Typography sx={{ mt: 4, mb: 2 }}>{steps[activeStep]}</Typography>
                    <motion.div>
                    { activeStep === 0 && (
                      <ShippingForm 
                        activeStep={activeStep} 
                        steps={steps} 
                        handleNext={handleNext} 
                        handleBack={handleBack} 
                        shippingFee={shippingFee}
                        setShippingFee={setShippingFee}
                        setTax={setTax}
                        address={shippingAddress}
                        setAddress={setShippingAddress}
                        email={email}
                        setEmail={setEmail}
                      />
                    )}
                    
                    { activeStep === 1 && (
                      <BillingForm 
                        activeStep={activeStep} 
                        steps={steps} 
                        handleNext={handleNext} 
                        handleBack={handleBack}
                        address={billingAddress}
                        setAddress={setBillingAddress}
                        shippingAddress={shippingAddress}
                        isSameAddress={isSameAddress}
                        setIsSameAddress={setIsSameAddress}
                      />
                    )}
          
                    { activeStep === 2 && (
                      <PaymentForm 
                        activeStep={activeStep} 
                        steps={steps} 
                        handleBack={handleBack}
                        shippingAddress={shippingAddress}
                        billingAddress={billingAddress}
                        isSameAddress={isSameAddress}
                        shippingFee={shippingFee}
                        subtotal={subtotal}
                        tax={tax}
                        total={total}
                        email={email}
                        handleReset={handleResetAfterPayment}
                        setIsLoading={setIsLoading}
                      />
                    )}
                    </motion.div>
                    
                  </React.Fragment>
              </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
              Order Summary
            </Typography>
            
            <Box 
              sx={{
                width: '95%',
                border: '1px solid #e0e0e0',
                marginTop: '1rem',
                padding: '10px',
              }} 
              >
              <div className={classes.summaryTextWrapper}>
                <Typography variant='body1'>Subtotal</Typography>
                <Typography variant='body1'>${subtotal}</Typography>
              </div>
              <div className={classes.summaryTextWrapper}>
                <Typography variant='body1'>Shipping</Typography>
                <Typography variant='body1'>${shippingFee}</Typography>
              </div>
              <div className={classes.summaryTextWrapper}>
                <Typography variant='body1'>Taxes</Typography>
                <Typography variant='body1'>${tax}</Typography>
              </div>
              <div className={`${classes.summaryTextWrapper} ${classes.line}`}>
                <Typography variant='body1'>Total</Typography>
                <Typography variant='body1'>${total}</Typography>
              </div>
            </Box>
          </Grid>
        </Grid>
      </>
      }
    </>
  )
}

export default CheckoutPage;