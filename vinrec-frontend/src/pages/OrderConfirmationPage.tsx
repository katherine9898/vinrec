import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { makeStyles } from '@mui/styles';
import { CheckCircle } from '@mui/icons-material';

const useStyles = makeStyles({
  body:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
  }
});

const OrderConfirmationPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/');
  };

  return (
    <div className={classes.body}>
      <CheckCircle style={{ fontSize: '80px' }} />
      <h2>Thank you for your purchase!</h2>
      <p>We will send you an email when your order has shipped.</p>
      <Button 
        handleOnClick={handleOnClick} 
        content="Back to Home"
        width="200px"
      />
    </div>
  )
}

export default OrderConfirmationPage;