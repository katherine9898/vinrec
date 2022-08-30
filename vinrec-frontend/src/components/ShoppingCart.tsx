import { Box, Drawer, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { Button } from './Button';
import CloseIcon from '@mui/icons-material/Close';
import CartItem from './CartItem';
import { motion } from 'framer-motion';

const useStyles = makeStyles({
  sideSheetWrapper: {
    marginLeft: '20px',
    marginRight: '20px',
    marginBottom: '20px',
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid black',
  },
  buttonWrapper: {
    marginLeft: '50px',
    marginTop: '10px',
  },
  subtotalWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid black',
    paddingTop: '10px',
  },
  taxWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  bodyWrapper: {
    marginTop: '5px',
    marginBottom: '5px',
    height: '72vh',
    overflow: 'scroll',
  },
  cartItemWrapper: {
    marginTop: '10px',
    marginBottom: '10px',
  },
});

const ShoppingCart = () => {
  const { cart, showCart, setShowCart, subtotal } = useStateContext();
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Drawer
      anchor='right'
      open={showCart}
      onClose={() => setShowCart(false)}
    >
      <Box sx={{ 
        width: {xs: '100vw', sm: '40vw', md: '40vw'},
        maxWidth: '500px'
      }}>
      <div className={classes.sideSheetWrapper}>
        <div key='sidesheet-header' className={classes.headerWrapper}>
          <h3>Your Cart</h3>
          <IconButton type='button' onClick={() => setShowCart(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        {cart.length > 0 ? (
          <div>
            <div key='sidesheet-body' className={classes.bodyWrapper}>
              
                {cart.map((item: any) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={classes.cartItemWrapper}
                    key={item.vinylRecordId}
                  >
                    <CartItem key={item.vinylRecordId} item={item}/>
                  </motion.div>
                ))}
            </div>

            <div key='sidesheet-footer'>
              <div className={classes.subtotalWrapper}>
                <Typography variant='body1'>
                  Subtotal
                </Typography>
                <Typography variant='body1'>
                  ${subtotal}
                </Typography>
              </div>
              <Typography variant='body1' className={classes.taxWrapper}>
                Taxes and shipping calculated at checkout
              </Typography>

              <div className={classes.buttonWrapper}>
                <Button width='90%' content='Check Out' handleOnClick={() => { setShowCart(false); navigate("/checkout"); }}/>
                <Button width='90%' content='Continue Shopping' handleOnClick={() => setShowCart(false)}/>
              </div>
            </div>
          </div>
        ) : (
          <Typography variant='body1' sx={{
            textAlign: 'center',
            marginTop: '20px',
            marginBottom: '20px'
          }}>
              Your cart is empty
          </Typography>
        )}
        
      </div>
      </Box>
    </Drawer>
  )
}

export default ShoppingCart;