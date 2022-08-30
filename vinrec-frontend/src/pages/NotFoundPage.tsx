import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { makeStyles } from '@mui/styles';
import ErrorIcon from '@mui/icons-material/Error';

const useStyles = makeStyles({
  body:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
  }
});

const NotFoundPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/');
  };

  return (
    <div className={classes.body}>
      <ErrorIcon style={{ fontSize: '80px' }} />
      <h2>Oops, Page Not Found</h2>
      <Button 
        handleOnClick={handleOnClick} 
        content="Back to Home"
        width="200px"
      />
    </div>
  )
}

export default NotFoundPage;