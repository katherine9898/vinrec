import React from 'react';
import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { motion } from 'framer-motion';
import AddressForm from './AddressForm';
import StepButton from './StepButton';
import { AddressProps } from '../../models/AddressProps';

const BillingForm = (props: {
  activeStep: number, 
  handleNext: () => void, 
  handleBack: () => void,
  steps: string[],
  address: AddressProps,
  setAddress: (address: AddressProps) => void,
  shippingAddress: AddressProps,
  isSameAddress: boolean,
  setIsSameAddress: (isSameAddress: boolean) => void,
}) => {
  const { 
    activeStep, 
    handleNext, 
    handleBack, 
    steps,
    address,
    setAddress,
    shippingAddress,
    isSameAddress,
    setIsSameAddress,
  } = props;
  
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNext();
  };

  const handleOnChange = (value: boolean) => {
    setIsSameAddress(value);
    if (value) {
      setAddress(shippingAddress);
    }
    
  };


  return (
    <Box component="form" onSubmit={handleOnSubmit}>
        <motion.div>
          <FormGroup>
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={isSameAddress}
                  onChange={(e) => {handleOnChange(e.target.checked)}}
                
                />
              } 
              label="My billing information is the same as the shipping information" />
          </FormGroup>
          {!isSameAddress && <AddressForm address={address} setAddress={setAddress} key="billing-address"/>}
        </motion.div>
        <StepButton activeStep={activeStep} steps={steps} handleBack={handleBack}/>
    </Box>
  )
}

export default BillingForm;