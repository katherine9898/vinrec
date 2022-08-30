import { motion } from "framer-motion"
import { makeStyles } from '@mui/styles';
import LoadingImage from "../assets/spin-vinyl.gif";

const useStyles = makeStyles({
  root: {
    width: '150px',
    height: '150px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
});

export const Loading = () => {
  const classes = useStyles();

  return (
    <motion.div >
      <img className={classes.root} src={LoadingImage} alt="Loading" />
    </motion.div>
    );
  };

export default Loading;