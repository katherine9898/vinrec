import { Container, FormControl, FormHelperText, Grid, MenuItem, Select, Typography } from "@mui/material"
import { Button } from "../components/Button"
import { makeStyles, styled } from '@mui/styles';
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useState } from "react";
import useAxios from "axios-hooks";
import Loading from "../components/Loading";

const useStyles = makeStyles({
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pictureWrapper: {

  },
  productWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  quantityWrapper: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  centerWrapper: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Img = styled('img')({
  padding: '20px',
  paddingBottom: '0px',
  width: '280px',
  objectFit: 'cover',
});

const RecordPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useStateContext();
  const [quantity, setQuantity] = useState< number | string>(1);

  const [{ data: record, loading, error }, refetchVinylRecord] = useAxios({
    url: `${process.env.REACT_APP_BASE_URL}/vinylrecord/${id}`,
    method: "GET"
  });

  console.log(id);

  const handleAddToCart = () => {
    addToCart({
      vinylRecordId: id, 
      quantity: quantity, 
      artist: record?.artist, 
      title: record?.title, 
      imageUrl: record?.imageUrl, 
      onSale: record?.onSale, 
      currentPrice: record?.currentPrice, 
      originalPrice: record?.originalPrice, 
      upc: record?.upc,
      totalPrice: (record?.currentPrice * (quantity as number)),
    });
  };

  return (
    <Container className="classes.body" maxWidth={false}>
      { loading ? (
        <Loading />
      ) : (
        <>
          {record ? (
            <>
              <h1>Vinyl Record</h1>
              <Grid
                container
                className={classes.productWrapper}
              >
                <Grid item xs={12} sm={7}>
                  <Img src={record?.imageUrl} alt={record?.title} />
                </Grid>
              
                <Grid item xs={12} sm={5}>
                  <Typography variant="subtitle1">
                    {record?.artist}
                  </Typography>
                  <Typography variant="h4">
                    {record?.title}
                  </Typography>
                  <Typography variant="subtitle1" color={record?.onSale ? 'red' : ''}>
                    ${record?.currentPrice}
                  </Typography>
                  {record?.onSale && (
                    <Typography variant="subtitle1" sx={{textDecoration: 'line-through'}}>
                      ${record?.originalPrice}
                    </Typography>
                  )}
                  {record?.status !== 'Out of stock' && (
                    <Typography variant="body2">
                      {record?.status}
                    </Typography>
                  )}

                  <div className={classes.quantityWrapper}>
                    <Typography variant="body1">
                      Quantity:
                    </Typography>
                    <FormControl sx={{ minWidth: 120 }}>
                      <Select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        variant="standard"
                        defaultValue={1}
                      >
                        {
                          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </div>
                  <Button 
                    content={ record?.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                    handleOnClick={handleAddToCart}
                    width="100%"
                    height="40px"
                    disabled={record?.quantity === 0}
                  />
                </Grid>
              </Grid>
              <h4>Descriptions</h4>
              <p>{record?.description}</p>
            </>
          ) : (
            <div className={classes.centerWrapper}>
              <h3>Record not found</h3>
              <Button
                content="Back to Home"
                handleOnClick={() => navigate("/")}
                width="178px"
                height="40px"
              />
            </div>
          )}
        </>
      )}
    </Container>
  )
};

export default RecordPage;