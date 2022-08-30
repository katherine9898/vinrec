import { motion } from "framer-motion"
import { makeStyles } from '@mui/styles';

interface PropsStyled {
  width: string;
  height: string;
}

const useStyles = makeStyles({
  root: {
    background: '#000000',
    color: 'white',
    borderRadius: '15px',
    width: (props: PropsStyled) => props?.width,
    height: '40px',
    marginTop: '5px'
  }
});


export const Button = ( props: { 
  content: string, 
  handleOnClick: any, 
  type?: any, 
  width?: string, 
  height?: string,
  disabled?: boolean,
}) => {
  const { 
    content, 
    handleOnClick, 
    type = "button", 
    width = "100px", 
    height = "40px",
    disabled = false,
  } = props;
  const classes = useStyles({ width, height });

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleOnClick}
      className={classes.root}
      type={type}
      disabled={disabled}
    >
      {content}
    </motion.button>
    );
  };