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
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Tooltip,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import MuiAlert from "@material-ui/lab/Alert";

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
  const history = useHistory();
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

  //Get all data of users
  const getData = async () => {
    try {
      const res = await axios.get(ROUTES.GetAllUsers);
      console.log("data==>", res.data);
      const { users } = res.data;
      setLoading(false);
      setProducts(users);
      setfProducts(users);
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
    let f = products.filter((p) => p.name.toLowerCase().includes(value));
    setfProducts(f);
  };

  //Clear Filter
  const clearFilter = () => {
    setSearch("");
    setfProducts(products);
  };

  //Delete User
  const deleteUser = (id) => {
    sweetAlert({
      title: "Are you sure want to remove User?",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
      closeOnClickOutside: false,
    }).then(async (yes) => {
      if (yes) {
        setLoading(true);
        try {
          const res = await axios.delete(ROUTES.DeleteUser + id);
          setLoading(false);
          setState({
            snackbar: true,
            error: "User deleted Successfully !",
            type: "success",
          });
          getData();
        } catch (error) {
          // console.log(error.response);
          setLoading(false);
          setState({
            snackbar: true,
            error: "Failed to delete User !",
            type: "error",
          });
        }
      }
    });
  };

  //Go to orders page
  const showUserOrders = (user) => {
    localStorage.setItem("user-orders", JSON.stringify(user));
    history.push({
      pathname: "/orders",
    });
  };

  return (
    <div className={classes.container}>
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
      <div style={{ marginBottom: 10 }}>
        <TextField
          margin="dense"
          placeholder="Search by name..."
          value={searchValue}
          onChange={(e) => filterProducts(e.target.value.toLowerCase())}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => clearFilter()} edge="end">
                  <Close />
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </div>

      <Grid container>
        <TableContainer style={{ marginTop: 10 }} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="body1">Name</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">Email</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">Contact no.</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">Shipping Address</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">No. of Orders</Typography>
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fproducts.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>+92 {user.contact}</TableCell>
                  <TableCell>{user.shippingAddress}</TableCell>
                  <TableCell align="center">
                    <Tooltip title={"See Orders of this User"}>
                      <IconButton onClick={() => showUserOrders(user)}>
                        <Typography variant="body1">
                          {user.orders.length}
                        </Typography>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={"Delete User"}>
                      <IconButton
                        style={{ color: "red" }}
                        onClick={() => deleteUser(user._id)}
                      >
                        <DeleteOutline />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {loading === false && products.length === 0 ? (
          <Typography style={{ padding: 15 }} variant="body1">
            No Customers found in Database
          </Typography>
        ) : null}
      </Grid>
    </div>
  );
};

export default Index;
