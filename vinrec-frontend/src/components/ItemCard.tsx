import React from 'react'
import { motion } from 'framer-motion';
import { makeStyles } from '@mui/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  body: {
    borderRadius: '25px',
    boxShadow: '0px 1px 10px rgba(0,0,0,0.75)',
    maxHeight: '400px',
    maxWidth: '250px',
    display: "grid",
    alignItems: "center",
    justifyContent: "center"
  },
  gridItemContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  divContainer: {
    alignItems: 'center',
  }
});

const Img = styled('img')({
  padding: '20px',
  paddingBottom: '0px',
  width: '60%',
  objectFit: 'cover'
});

const ItemCard = (props: { item: any; }) => {
  const { item } = props;
  const classes = useStyles();
  
  return (
    <motion.div 
      className={classes.body}
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{delay: 0.5, duration: 0.7}}
      >

      <Card sx={{ maxWidth: 250 }}>
        <CardActionArea
          component={Link} to={`/vinyl-record/${item.vinylRecordId}`}
        >
          <CardMedia
            component="img"
            height="200"
            image={item?.imageUrl}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {item?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item?.artist}
            </Typography>
            <Typography variant="body2" color="text.secondary">
             ${item?.currentPrice}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  )
}

export default ItemCard;