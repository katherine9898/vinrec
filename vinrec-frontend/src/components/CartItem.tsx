import React from 'react';
import { Paper, Grid, ButtonBase, Typography, FormControl, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/styles';
import { useStateContext } from '../contexts/ContextProvider';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const CartItem = (props: any) => {
  const { item } = props;
  const { removeFromCart, updateCart } = useStateContext();
  
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={item?.imageUrl} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {item?.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {item?.artist}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                ID: 1030114
              </Typography> */}
              <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    value={item?.quantity}
                    onChange={(e) => updateCart(item?.vinylRecordId, e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    variant="standard"
                    defaultValue={item?.quantity}
                  >
                    {
                      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <MenuItem key={num} value={num}>{num}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
            </Grid>
            <Grid item>
              <Typography 
                sx={{ cursor: 'pointer' }} 
                variant="body2"
                onClick={() => removeFromCart(item)}
              >
                Remove
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              ${item?.totalPrice}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CartItem