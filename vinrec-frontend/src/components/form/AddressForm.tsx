import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useMemo } from 'react';
import { countries } from '../../data/countries';
import { AddressProps } from '../../models/AddressProps';

const useStyles = makeStyles({
  cardContainer: {}
});

const AddressForm = (props: {
  address?: AddressProps,
  setAddress: (e: any) => void,
}) => {
  const { 
    address,
    setAddress,
  } = props;
  const [states, setStates] = React.useState<any>([]);
  const classes = useStyles();

  useEffect(() => {
    if (address && address.country) {
      setStates(countries.find(country => country.name === address.country)?.states);
    }
  },[]);

  const handleOnChangeCountry = (e: any) => {
    setAddress((prev: any) => ({ ...prev, country: e.target.value }) as AddressProps);
    setStates(countries.find(country => country.name === e.target.value)?.states);
  };

  return (
    <Box id='address-form' className={classes.cardContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField 
            required 
            id="firstName" 
            label="First name" 
            name="firstName" 
            fullWidth
            value={address?.firstName}
            onChange={(e) => setAddress((prev: any) => ({ ...prev, firstName: e.target.value }) as AddressProps)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            required 
            id="lastName" 
            label="Last name" 
            name="lastName"  
            fullWidth
            value={address?.lastName}
            onChange={(e) => setAddress((prev: any) => ({ ...prev, lastName: e.target.value }) as AddressProps)}
          />
        </Grid>
      </Grid>
      <TextField 
        label="Address" 
        name="addressLine1" 
        fullWidth 
        sx={{ mt: 2}} 
        required
        value={address?.addressLine1}
        onChange={(e) => setAddress((prev: any) => ({ ...prev, addressLine1: e.target.value }) as AddressProps)}
      />
      <TextField 
        label="Address 2 (Optional)" 
        name="addressLine2" 
        fullWidth sx={{ mt: 2}}
        value={address?.addressLine2}
        onChange={(e) => setAddress((prev: any) => ({ ...prev, addressLine2: e.target.value }) as AddressProps)}
      />
      <Grid container spacing={2} sx={{ mt: 0}}>
        <Grid item xs={12} sm={6}>
          <TextField 
            required 
            id="city" 
            label="City" 
            name="city" 
            fullWidth
            value={address?.city}
            onChange={(e) => setAddress((prev: any) => ({ ...prev, city: e.target.value }) as AddressProps)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            required 
            id="postalCode" 
            label="Postal Code/Zip" 
            name="postalCode" 
            fullWidth
            value={address?.postalCode}
            onChange={(e) => setAddress((prev: any) => ({ ...prev, postalCode: e.target.value }) as AddressProps)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth>
            <InputLabel id="select-country">Country</InputLabel>
            <Select
              labelId="select-country"
              id="select-country"
              label="Country"
              value={address?.country}
              onChange={(e) => handleOnChangeCountry(e)}
            >
              {
                countries.map(country => (
                  <MenuItem key={country.code} value={country.name}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl required fullWidth>
            <InputLabel id="select-state">Province/State</InputLabel>
            <Select
              labelId="select-state"
              id="demo-simple-select-state"
              label="Province/State"
              value={address?.state}
              disabled={!states.length}
              onChange={(e) => setAddress((prev: any) => ({ ...prev, state: e.target.value }) as AddressProps)}
            >
              {
                states.map((state: any) => (
                  <MenuItem key={state.code} value={state.name}>{state.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        
      </Grid>
      <TextField 
        label="Phone" 
        name="phoneNumber" 
        fullWidth 
        sx={{ mt: 2}} 
        required
        value={address?.phoneNumber}
        onChange={(e) => setAddress((prev: any) => ({ ...prev, phoneNumber: e.target.value }) as AddressProps)}
      />
    </Box>
  )
}

export default AddressForm;