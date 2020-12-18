import React from "react";
import { Paper, Grid, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(1),
    position: "relative",
    cursor: "pointer",
  },
  grid: {
    display: "flex",
    height: "100px",
    width: "100%",
  },
  gridItem: {
    padding: theme.spacing(1),
    // height: "100px",
  },
  categoryOverlay: {
    position: "absolute",
    top: -9,
    left: 0,
    transformOrigin: "left",
    transform: "rotate(90deg) translateY(-50%)",
    backgroundColor: "rgba(28,28,28,0.7)",
    color: "white",
    width: "100px",
    display: "flex",
    justifyContent: "center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
}));

export default function OrderHistoryItemCard({ content }) {
  const classes = useStyles();
  return content ? (
    <Paper className={classes.card} elevation={3} onClick={() => {}}>
      <Box className={classes.categoryOverlay}>
        <Typography variant="caption"></Typography>
      </Box>
      <Grid container className={classes.grid}>
        <Grid item xs={2} className={classes.gridItem}>
          <div
            style={{
              height: "100%",
              width: "100%",
              backgroundImage: `url(${content.images[0]})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              borderRadius: "5px",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </Grid>
        <Grid item xs={10} className={classes.gridItem}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1">
              <b>{content.name}</b>
            </Typography>
            <Typography variant="body1">
              <b>PKR {content.price} </b>
            </Typography>
            <Typography variant="body2">
              {content.size} x {content.quantity}
            </Typography>
          </Box>
          <Box height="55px" overflow="hidden">
            <Typography variant="body2">
              {content.description.split(" ").slice(0, 15).join(" ") + "..."}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  ) : (
    <Typography variant="body2">Something Went Wrong!</Typography>
  );
}
