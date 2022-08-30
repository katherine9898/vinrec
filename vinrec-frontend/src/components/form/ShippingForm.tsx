import React from 'react';
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import AddressForm from './AddressForm';
import StepButton from './StepButton';
import { AddressProps } from '../../models/AddressProps';

const ShippingForm = (props: {
  activeStep: number, 
  handleNext: () => void, 
  handleBack: () => void,
  steps: string[],
  shippingFee: number,
  setShippingFee: (fee: number) => void,
  setTax: (tax: number) => void,
  address: AddressProps,
  setAddress: (address: AddressProps) => void,
  email: string,
  setEmail: (email: string) => void,
}) => {
  const { 
    activeStep, 
    handleNext, 
    handleBack, 
    steps,
    shippingFee,
    setShippingFee,
    setTax,
    address,
    setAddress,
    email,
    setEmail,
  } = props;

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setEmail(formData.get("email") as string);
    handleNext();
  };

  return (
    <Box component="form" onSubmit={handleOnSubmit}>
        <motion.div>
            <TextField 
              value={email}
              required 
              id="email" 
              label="Email" 
              name="email" 
              fullWidth
              sx={{
                mb: 2
              }}
              onChange={(e) => setEmail(e.target.value as string)}
            />
          <AddressForm address={address} setAddress={setAddress} key="shipping-address"/>
          <FormControl required sx={{ mt: 2 }} fullWidth>
            <InputLabel id="shipping-fee-options-label">Shipping option</InputLabel>
            <Select
              labelId="shipping-fee-options-label"
              id="shipping-fee-options"
              value={shippingFee}
              label="Shipping Option*"
              onChange={(e) => {setShippingFee(e.target.value as number)}}
            >
              <MenuItem value={15}>
                Standard Shipping - $15
              </MenuItem>
              <MenuItem value={20}>Express Shipping - $20</MenuItem>
            </Select>
          </FormControl>
        </motion.div>
        <StepButton activeStep={activeStep} steps={steps} handleBack={handleBack}/>
    </Box>
  )
}

export default ShippingForm;