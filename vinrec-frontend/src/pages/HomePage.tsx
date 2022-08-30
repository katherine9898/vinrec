import { Box, Container, Grid, Paper, Typography} from "@mui/material"
import { Button } from "../components/Button"
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useStateContext } from "../contexts/ContextProvider";
//import useAxios from "../hooks/useAxios";
import ItemCard from "../components/ItemCard";
import VinylWallpaper from "../assets/vinyl-wallpaper.jpeg";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import GenresList from "../components/GenresList";
import ItemCardList from "../components/ItemCardList";
import useAxios from "axios-hooks";

const useStyles = makeStyles({
  body: {},
  boxImage: {
    backgroundImage: `jrl(${VinylWallpaper})`,
    opacity: 0.7,
    width: '100%',
  },
  textCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
  },
  itemList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(288px, 1fr))',
    gridColumnGap: '0.5rem',
    gridRowGap: '1rem',
    textAlign: 'center',
    alignItems: 'center',
    paddingLeft: '1rem',
  }
});

const settings = {
  dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
};

const HomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { cart, token } = useStateContext();


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ data, loading, error }, refetchVinylRecords] = useAxios({
    url: `${process.env.REACT_APP_BASE_URL}/vinylrecord/newreleases`,
    method: "GET"
  });

  return (
    <>
      {loading ? 
        (<Loading/>)
        :
        (
          <>
            <div style={{position: 'relative'}}>
              <img src={VinylWallpaper} alt="vinyl-wallpaper" className={classes.boxImage}/>
              <div className={classes.textCenter}>
                <h1>VinRec</h1>
                <h3>The vinyl record store - Est 2022</h3>
              </div>
            </div>
            
            <h2>New Release</h2>
            {data && data.length > 0 ? (
              <ItemCardList items={data}/>
            ) : (
              <Typography sx={{textAlign: 'center'}}>No vinyl records found</Typography>
            )}
            
            <h2>Genres</h2>
            <GenresList/>
          </>
        )
      }
      
    </>
  )
};

export default HomePage;