import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import CartItem from '../CartItem';
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AlertColor, Box, LinearProgress, Typography } from '@mui/material';
import StepButton from './StepButton';
import useAxios from 'axios-hooks';
import { useNavigate } from 'react-router-dom';
import SnackbarCustom from '../SnackbarCustom';
import { AddressProps } from '../../models/AddressProps';
import { makeStyles } from '@mui/styles';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

const useStyles = makeStyles({
  progressBar: {
  "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "black",
  },
  "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "grey",
  },
  }
})

const PaymentForm = (props: {
  activeStep: number, 
  handleBack: () => void,
  steps: string[],
  shippingAddress: AddressProps,
  billingAddress: AddressProps,
  shippingFee: number,
  tax: number,
  subtotal: number,
  total: number,
  email: string,
  handleReset: () => void,
  setIsLoading: (isLoading: boolean) => void,
  isSameAddress: boolean,
}) => {
  const {
    activeStep,
    steps,
    handleBack,
    shippingAddress,
    billingAddress,
    isSameAddress,
    shippingFee,
    tax,
    subtotal,
    total,
    email,
    handleReset,
    setIsLoading,
  } = props;
  const { cart } = useStateContext();
  const navigate = useNavigate();
  const [ snackbar, setSnackbar ] = useState(
    {
      open: false,
      message: '',
      severity: 'success'
    }
  );
  const classes = useStyles();

  const [{ data, loading, error: orderPlacementError }, placeOrder] = useAxios({
    url: `${process.env.REACT_APP_BASE_URL}/Order`,
    method: "POST"
  },
  { manual: true });

  useEffect(() => {
    if (orderPlacementError) {
      console.log(orderPlacementError?.response?.data);
      setSnackbar({
        open: true,
        message: orderPlacementError.message,
        severity: 'error'
      });
    }
  }, [orderPlacementError]);

  const handleCloseSnackbar = () => {
    setSnackbar(prevValue => ({
      open: false,
      message: prevValue.message,
      severity: prevValue.severity
    }));
  };

  const handleSubmit = async (event: any, elements: any, stripe: any) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      console.log('[error]', error);
      setSnackbar({
        open: true,
        message: `${error?.message}`,
        severity: 'error'
      });
    } else {
      console.log('place order');
      console.log({
        status: "Recieved",
        orderItems: cart,
        shippingFee,
        tax,
        subtotal,
        total,
        shippingAddress,
        billingAddress,
        isSameAddress,
        deliveryMethod: shippingFee === 15 ? "Standard" : "Express",
        isGuestOrder: true,
        paymentMethodId: paymentMethod.id,
        email,
      });
     
      await placeOrder({
        data: {
          status: "Recieved",
          orderItems: cart,
          shippingFee,
          tax,
          subtotal,
          total,
          shippingAddress,
          billingAddress,
          isSameAddress,
          deliveryMethod: shippingFee === 15 ? "Standard" : "Express",
          isGuestOrder: true,
          paymentMethodId: paymentMethod.id,
          email,
        }
      });
      handleReset();
      navigate('/order-confirmation');
    }
  };

  
  return (
    <>
      {cart.map((item: any) => (
        <CartItem key={item.vinylRecordId} item={item}/>
      ))}
      <Typography variant='body1' sx={{mt:2}}>Payment</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
        {({ elements, stripe }) => (
          <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            <CardElement />
            <br /> <br />
            <StepButton activeStep={activeStep} steps={steps} handleBack={handleBack} disabled={loading} />
          </form>
        )}
        </ElementsConsumer>
      </Elements>
      {loading && 
        <Box sx={{ width: '100%' }} className={classes.progressBar}>
          <LinearProgress/>
        </Box>
      }
      <SnackbarCustom 
        open={snackbar.open} 
        message={snackbar.message} 
        handleClose={handleCloseSnackbar}
        severity={snackbar.severity as AlertColor}
      />
    </>
  )
};

export default PaymentForm;