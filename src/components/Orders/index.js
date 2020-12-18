import React, { useState, useEffect } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Paper,
  Snackbar,
  InputAdornment,
  CircularProgress,
  Backdrop,
  Tabs,
  Tab,
  AppBar,
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
  Check,
  Done,
  HelpOutline,
  Search,
  LocalShipping,
  DeleteOutline,
  Edit,
} from "@material-ui/icons";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  bodyPadding: {
    // paddingBottom: theme.spacing(1),
    fontWeight: "bold",
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
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
  const [value, setValue] = useState(0);

  const [searchValue, setSearch] = useState("");

  const [pendingOrders, setPending] = useState([]);
  const [confirmedOrders, setConfirmed] = useState([]);
  const [deliveredOrders, setDelivered] = useState([]);

  const [fpendingOrders, setfPending] = useState([]);
  const [fconfirmedOrders, setfConfirmed] = useState([]);
  const [fdeliveredOrders, setfDelivered] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  //Switch Tabs
  const handleChange = (event, newValue) => {
    setSearch("");
    setValue(newValue);
  };

  //Filter All orders
  const filterOrders = (orders) => {
    let pendingOrders = orders.filter((o) => o.status === "PENDING");
    let confirmedOrders = orders.filter((o) => o.status === "CONFIRMED");
    let deliveredOrders = orders.filter((o) => o.status === "DELIVERED");
    setPending(pendingOrders);
    setConfirmed(confirmedOrders);
    setDelivered(deliveredOrders);
    setfPending(pendingOrders);
    setfConfirmed(confirmedOrders);
    setfDelivered(deliveredOrders);
  };

  //Get all data of Orders
  const getData = async () => {
    try {
      const res = await axios.get(ROUTES.GetAllOrders);
      console.log("data==>", res.data);
      const { orders } = res.data;
      setLoading(false);
      filterOrders(orders);
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
  const filterProducts = (v) => {
    setSearch(v);
    if (value === 0) {
      let f = pendingOrders.filter((p) => p.orderNo.includes(v));
      setfPending(f);
    } else if (value === 1) {
      let f = confirmedOrders.filter((p) => p.orderNo.includes(v));
      setfConfirmed(f);
    } else {
      let f = deliveredOrders.filter((p) => p.orderNo.includes(v));
      setfDelivered(f);
    }
  };

  const renderPendingOrders = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          {loading === false && pendingOrders.length === 0 ? (
            <Typography variant="body1">No Orders found in Database</Typography>
          ) : null}
          {fpendingOrders.map((item, i) => (
            <Paper key={i} className={classes.card} elevation={5}>
              <Box className={classes.cardTop}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">
                    Order Number # <b>{item.orderNo}</b>
                  </Typography>
                  <Typography variant="body1">
                    Total Amount: <b>{item.totalBill} PKR</b>
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">
                    Placed on: <b>{item.orderDate}</b>
                  </Typography>
                </Box>
                <Box display="flex">
                  {/* <Typography variant="body1">
                    Status: <b>{item.status}</b>
                  </Typography> */}
                </Box>
                <Typography variant="body1">
                  Shipping Address: <b>{item.shippingAddress}</b>
                </Typography>
                <Typography variant="body1">
                  Payment Method: <b>{item.paymentMethod}</b>
                </Typography>
              </Box>
              <Box p={2}>
                <div style={{ marginBottom: 10 }}>
                  <InputLabel id="demo-simple-select-label">
                    Change Status
                    <Select
                      style={{ marginLeft: 10 }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={item.status}
                      onChange={(e) => changeStatus(item._id, e.target.value)}
                    >
                      <MenuItem value={"PENDING"}>PENDING</MenuItem>
                      <MenuItem value={"CONFIRMED"}>CONFIRMED</MenuItem>
                      <MenuItem value={"DELIVERED"}>DELIVERED</MenuItem>
                    </Select>
                  </InputLabel>
                </div>
                {item.cart.map((item, i) => {
                  return <OrderHistoryItemCard key={i} content={item} />;
                })}
              </Box>
            </Paper>
          ))}
        </Grid>
      </Grid>
    );
  };
  const renderConfirmedOrders = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          {loading === false && confirmedOrders.length === 0 ? (
            <Typography variant="body1">No Orders found in Database</Typography>
          ) : null}
          {fconfirmedOrders.map((item, i) => (
            <Paper key={i} className={classes.card} elevation={5}>
              <Box className={classes.cardTop}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">
                    Order Number # <b>{item.orderNo}</b>
                  </Typography>
                  <Typography variant="body1">
                    Total Amount: <b>{item.totalBill} PKR</b>
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
                <Typography variant="body1">
                  Shipping Address: <b>{item.shippingAddress}</b>
                </Typography>
                <Typography variant="body1">
                  Payment Method: <b>{item.paymentMethod}</b>
                </Typography>
              </Box>
              <Box p={2}>
                <div style={{ marginBottom: 10 }}>
                  <InputLabel id="demo-simple-select-label">
                    Change Status
                    <Select
                      style={{ marginLeft: 10 }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={item.status}
                      onChange={(e) => changeStatus(item._id, e.target.value)}
                    >
                      <MenuItem value={"CONFIRMED"}>CONFIRMED</MenuItem>
                      <MenuItem value={"DELIVERED"}>DELIVERED</MenuItem>
                    </Select>
                  </InputLabel>
                </div>
                {item.cart.map((item, i) => {
                  return <OrderHistoryItemCard key={i} content={item} />;
                })}
              </Box>
            </Paper>
          ))}
        </Grid>
      </Grid>
    );
  };
  const renderDeliveredOrders = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          {loading === false && deliveredOrders.length === 0 ? (
            <Typography variant="body1">No Orders found in Database</Typography>
          ) : null}
          {fdeliveredOrders.map((item, i) => (
            <Paper key={i} className={classes.card} elevation={5}>
              <Box className={classes.cardTop}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">
                    Order Number # <b>{item.orderNo}</b>
                  </Typography>
                  <Typography variant="body1">
                    Total Amount: <b>{item.totalBill} PKR</b>
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">
                    Placed on: {item.orderDate}
                  </Typography>
                </Box>

                <Typography variant="body1">
                  Shipping Address: <b>{item.shippingAddress}</b>
                </Typography>
                <Typography variant="body1">
                  Payment Method: <b>{item.paymentMethod}</b>
                </Typography>
              </Box>
              <Box p={2}>
                <Box display="flex">
                  <Typography variant="body1" style={{ marginBottom: 10 }}>
                    Status: <b style={{ color: "green" }}>{item.status}</b>
                  </Typography>
                </Box>
                {item.cart.map((item, i) => {
                  return <OrderHistoryItemCard key={i} content={item} />;
                })}
              </Box>
            </Paper>
          ))}
        </Grid>
      </Grid>
    );
  };

  //Clear Filter
  const clearFilter = () => {
    setSearch("");
    setfPending(pendingOrders);
    setfConfirmed(confirmedOrders);
    setfDelivered(deliveredOrders);
  };

  //Change Status
  const changeStatus = async (id, status) => {
    setLoading(true);
    try {
      const res = await axios.put(ROUTES.ChangeOrderStatus, { id, status });
      console.log(res.data);
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
      <Typography style={{ marginBottom: 10 }} variant="h6">
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

      <AppBar position="static">
        <Tabs centered value={value} onChange={handleChange}>
          <Tab icon={<HelpOutline />} label="PENDING" {...a11yProps(0)} />
          <Tab icon={<Check />} label="CONFIRMED" {...a11yProps(1)} />
          <Tab icon={<LocalShipping />} label="DELIVERED" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
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
      <TabPanel value={value} index={0}>
        {renderPendingOrders()}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {renderConfirmedOrders()}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {renderDeliveredOrders()}
      </TabPanel>
    </div>
  );
};

export default Index;
