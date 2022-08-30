import React from 'react';
import { makeStyles } from '@mui/styles';
import { motion, AnimatePresence } from 'framer-motion';
import ItemCard from './ItemCard';

const useStyles = makeStyles({
  itemList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gridRowGap: '1rem',
    textAlign: 'center',
    alignItems: 'center',
  }
});

const ItemCardList = (props: any) => {
  const { items } = props;
  const classes = useStyles();
  return (
    <motion.div 
      layout
      className={classes.itemList}
    >
      <AnimatePresence>
        {items.map((vinylRecord: any) => (
          <ItemCard key={vinylRecord.vinylRecordId} item={vinylRecord} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};


export default ItemCardList;