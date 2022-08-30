import React from "react";
import { genres } from '../data/genres.js';
import { motion } from "framer-motion";
import { makeStyles, styled } from "@mui/styles";
import { Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  body: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  },
  buttonIcon: {
    backgroundColor: 'white',
    borderRadius: '50%',
    width: '45px',
    height: '45px',
    textAlign: 'center',
    alignItems: 'center',
  },
  itemWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '10px',
    backgroundColor: '#000000',
    color: '#ffffff',
    margin: '10px',
    padding: '10px',
    alignItems: 'center',
  },
   activeItem: {
     backgroundColor: '#212121',
   }
});

const Img = styled('img')({
  maxWidth: '70%',
  marginTop: '15%',
});

const GenresList = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleOnClick = (genre: string) => {
    navigate("/vinyl-records" + (genre !== '' ? `?genre=${genre}` : ''));
    document.documentElement.scrollTo(0, 0);
  };

  return (
    <motion.div
      className={classes.body}
    >
     {genres.map((genre, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={classes.itemWrapper}
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 190 }}
            exit={{ opacity: 0 }}
            transition={{duration: 0.2}}
            onClick={() => handleOnClick(genre.genre.toLowerCase())}
          >
            <div
              className={classes.buttonIcon}
            >
              <Img src={genre.icon} alt={genre.genre} />
            </div>
            <Typography variant="h6">
              {genre.genre}
            </Typography>
          </motion.div>
        )
     )}
        <motion.div
          className={classes.itemWrapper}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 190 }}
          exit={{ opacity: 0 }}
          
          onClick={() => {handleOnClick('')}}
        >
          <Typography variant="h6">
            All
          </Typography>
          <ArrowForwardIcon />
        </motion.div>
      
    </motion.div>
  )
}

export default GenresList;