import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { makeStyles } from '@mui/styles';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { capitalize } from "../utils/capitalize";
import { motion } from "framer-motion";
import GenresList from "../components/GenresList";
import SearchIcon from '@mui/icons-material/Search';
import ItemCardList from "../components/ItemCardList";
import useAxios from "axios-hooks";
import Loading from "../components/Loading";

const useStyles = makeStyles({
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
  },
  searchSortWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  sortWrapper: {
    width: '250px'
  },
  cardListWrapper: {
    marginTop: '25px',
  },
  recordsWrapper: {
    position: 'relative',
    width: '100%',
    height: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }
});

const RecordListPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ genre, setGenre ] = useState('');
  const [ sort, setSort ] = useState('');
  const [ search, setSearch ] = useState('');
  

  useEffect(() => {
    const queryParam = searchParams.get("genre");
    if (queryParam) {
      setGenre(queryParam);
      console.log(queryParam);
    } else {
      setGenre('');
    }
  }, [searchParams]);

  const [{ data, loading, error }, refetchVinylRecords] = useAxios({
    url: `${process.env.REACT_APP_BASE_URL}/vinylrecord?genre=${genre}&sortBy=${sort}&search=${search}`,
    method: "GET"
  });

  return (
    <Container className={classes.body} maxWidth={false}>
      <motion.div>
        <Grid container spacing={3}>
          <Grid item sm={0} md={3} sx={{
            display: {xs: "none", md: "block"},
          }}>
            <h3>Genre</h3>
            <GenresList/>
          </Grid>
          <Grid item 
            sm={12} 
            xs={12}
            md={9}
          >
            <h1 className={classes.title}>{ genre === '' ? 'All' : capitalize(genre)}</h1>
            <div
              className={classes.searchSortWrapper}
            >
              <div className={classes.sortWrapper} >
                <FormControl fullWidth>
                  <InputLabel id="sort">Sort By</InputLabel>
                  <Select
                    labelId="Sorting"
                    id="demo-simple-select"
                    value={sort}
                    label="Sort by"
                    variant="standard"
                    autoWidth
                    onChange={(e) => { setSort(e.target.value); }}
                  >
                    {/* <MenuItem value={'featured'}>Featured</MenuItem>
                    <MenuItem value={'bestseller'}>Best sellers</MenuItem> */}
                    <MenuItem value={'newest'}>Newest</MenuItem>
                    <MenuItem value={'asc'}>A-Z</MenuItem>
                    <MenuItem value={'desc'}>Z-A</MenuItem>
                    <MenuItem value={'price-asc'}>Price: Low to High</MenuItem>
                    <MenuItem value={'price-desc'}>Price: High to Low</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 2 }}>
                <TextField 
                  id="standard-basic" 
                  label="Search" 
                  variant="standard"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); console.log(e.target.value); }}
                />
                <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              </Box>
            </div>

            {loading ? (
              <div className={classes.recordsWrapper}>
                <Loading />
              </div>
            ) : (
              <>
                { data  && data.length > 0 ? (
                  <div className={classes.cardListWrapper}>
                    <ItemCardList items={data}/>
                  </div>
                ) : (
                  <div className={classes.recordsWrapper}>
                    <Typography sx={{textAlign: 'center'}}>No vinyl records found</Typography>
                  </div>
                )}
              </>
            )} 
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  )
};

export default RecordListPage;