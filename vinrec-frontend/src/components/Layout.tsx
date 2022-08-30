import { AppBar, Container, Fab, Toolbar, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { makeStyles } from '@mui/styles';
import { NavBar } from './NavBar';
import ShoppingCart from './ShoppingCart';
import NavigationIcon from '@mui/icons-material/Navigation';

const useStyles = makeStyles({
  body: {
    margin: '20px',
    marginTop: '100px',
  },
});

const Layout = (props: { children: any; }) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <>
      <NavBar/>
      <motion.div 
        animate={{ opacity: 1}}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={classes.body}>
        <ShoppingCart />
        <div>
          {children}
        </div>
      </motion.div>
    </>
  );
};

export default Layout;