import { Container } from "@mui/material"
import { Button } from "../components/Button"
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const ProfilePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/part1");
  };

  return (
    <Container className="classes.body">
      <h1>Profile</h1>
      
      <Button content="Sign out" handleOnClick={handleOnClick} />
    </Container>
  )
};

export default ProfilePage;