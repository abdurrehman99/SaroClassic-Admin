import React, { useState, useEffect } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Grid,
  TextField,
  Paper,
  Snackbar,
  InputAdornment,
  CircularProgress,
  Backdrop,
  IconButton,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import OrderHistoryItemCard from "./OrderCard";
import { ROUTES } from "../../utils/routes";
import axios from "axios";
import {
  Close,
  Add,
  Done,
  Search,
  DeleteOutline,
  Edit,
} from "@material-ui/icons";
import sweetAlert from "sweetalert";

const useStyles = makeStyles((theme) => ({
  bodyPadding: {
    // paddingBottom: theme.spacing(1),
    fontWeight: "bold",
  },
  container: {
    padding: 20,
  },
  card: {
    marginTop: 10,
    marginRight: 10,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  formControl: {
    width: "100%",
    marginBottom: 15,
    marginTop: 5,
  },
  table: {
    minWidth: 800,
  },
  avatar: {
    marginRight: 10,
  },
  AddNewBtn: {
    float: "right",
  },
  previewImg: {
    height: 250,
    width: 250,
    border: "2px solid " + theme.palette.primary.main,
  },
  navLink: {
    fontSize: 14,
    fontWeight: "600",
  },
  navLinkActive: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0582ff",
  },
  searchRow: {
    marginTop: theme.spacing(3),
    marginLeft: 40.1,
    verticalAlign: "center",
  },
  inlineFlex: {
    display: "inline-flex",
    verticalAlign: "center",
    width: "100%",
  },
  card: {
    marginBottom: theme.spacing(4),
    // marginTop: theme.spacing(2),
  },
  cardTop: {
    backgroundColor: "#082E52",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    padding: theme.spacing(1, 2),
    color: "white",
  },
  para: {
    fontWeight: "light",
    paddingBottom: 0,
  },
  box: {
    marginLeft: 40.1,
    // marginTop: 20,
  },
  closeButton: {
    position: "absolute",
    left: 0,
    top: 0,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Index = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    snackbar: false,
    error: "",
    type: "",
  });
  const [searchValue, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [modalTitle, setTitle] = useState("");
  const [products, setProducts] = useState([]);
  const [fproducts, setfProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  //Get all data of Orders
  const getData = async () => {
    try {
      const res = await axios.get(ROUTES.GetAllOrders);
      console.log("data==>", res.data);
      const { orders } = res.data;
      setLoading(false);
      setProducts(orders);
      setfProducts(orders);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      setState({
        snackbar: true,
        error: "Failed to fetch data",
        type: "error",
      });
    }
  };

  //Filter Product on search
  const filterProducts = (value) => {
    setSearch(value);
    let f = products.filter((p) => {
      let s = p.orderNo.substring(2, 5);
      return s.includes(value);
    });
    setfProducts(f);
  };

  //Clear Filter
  const clearFilter = () => {
    setSearch("");
    setfProducts(products);
  };

  //Change Status
  const changeStatus = async (id, status) => {
    setLoading(true);
    try {
      const res = await axios.put(ROUTES.ChangeOrderStatus, { id, status });
      setLoading(false);
      setState({
        snackbar: true,
        error: "Order Status Changed",
        type: "success",
      });
      getData();
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      setState({
        snackbar: true,
        error: "Failed to Change status",
        type: "error",
      });
    }
  };

  let QUANTITY = 0;

  return (
    <div className={classes.container}>
      <Typography variant="h6">
        <b>All Orders History</b>
      </Typography>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress style={{ width: 60, height: 60 }} color="primary" />
      </Backdrop>
      <Snackbar
        style={{ marginLeft: 90 }}
        open={state.snackbar}
        autoHideDuration={3000}
        onClose={() => setState({ ...state, snackbar: false })}
      >
        <Alert
          onClose={() => setState({ ...state, snackbar: false })}
          severity={state.type}
        >
          {state.error}
        </Alert>
      </Snackbar>
      <Grid container style={{ marginBottom: 10 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            margin="dense"
            placeholder="Seacrh by Order #"
            type="number"
            fullWidth
            value={searchValue}
            onChange={(e) => filterProducts(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                  SR
                </InputAdornment>
              ),
              endAdornment:
                searchValue.length > 0 ? (
                  <InputAdornment position="end">
                    <IconButton onClick={() => clearFilter()} edge="end">
                      <Close />
                    </IconButton>
                  </InputAdornment>
                ) : null,
            }}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {loading === false && products.length === 0 ? (
            <Typography variant="body1">No Orders found in Database</Typography>
          ) : null}
          {fproducts.map((item, i) => (
            <Paper key={i} className={classes.card} elevation={5}>
              <Box className={classes.cardTop}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">
                    Order Number # <b>{item.orderNo}</b>
                  </Typography>
                  <Typography variant="body1">
                    Total Amount: <b>{item.totalBill} PKR</b>
                  </Typography>
                  {item.cart.forEach((e) => {
                    QUANTITY = 0;
                    QUANTITY = QUANTITY + Number(e.quantity);
                  })}
                  <Typography variant="body1">
                    Total Items: <b>{QUANTITY}</b>
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">
                    Placed on: {item.orderDate}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography variant="body1" style={{ margin: "0 10px 0 0" }}>
                    Status: <b>{item.status}</b>
                  </Typography>
                </Box>
              </Box>
              <Box p={2}>
                {item.cart.map((item, i) => {
                  return <OrderHistoryItemCard key={i} content={item} />;
                })}
              </Box>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Index;
