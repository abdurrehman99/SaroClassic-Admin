import React, { useState, useEffect } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  ListItemSecondaryAction,
  CircularProgress,
  List,
  ListItem,
  Backdrop,
  IconButton,
  ListItemText,
  Paper,
  Container,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import { fieldValidate } from "../../utils/formValidation";
import { ROUTES } from "../../utils/routes";
import axios from "axios";
import sweetAlert from "sweetalert";
import { ExpandLess, ChevronRight, DeleteOutline } from "@material-ui/icons";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  bodyPadding: {
    // paddingBottom: theme.spacing(1),
    fontWeight: "bold",
  },
  actionButtons: {
    marginRight: 20,
    width: 122,
    height: 40.7,
    fontSize: "13px",
    fontWeight: "bold",
    textTransform: "none",
  },
  Text: { textAlign: "center", marginBottom: 20, marginTop: 20 },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  iconButton: {
    paddingTop: 0,
    paddingButtom: 0,
  },
  searchBar: {
    width: 255.4,
    marginRight: 20,
  },
  avatar: {
    marginRight: 10,
  },
  searchRow: {
    marginTop: theme.spacing(3),
    marginLeft: 40.1,
    verticalAlign: "center",
  },
  para: {
    fontWeight: "light",
    paddingBottom: 0,
  },
  box: {
    marginLeft: 40.1,
    // marginTop: 20,
  },
  footerRow: {
    width: "100%",
    margin: "auto",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  footerButton: {
    fontWeight: "bold",

    border: "1px solid #E0E0E0",
    marginLeft: 8,
    width: 38,
    height: 39,
  },
}));

const Index = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [MEN, setMEN] = useState([]);
  const [WOMEN, setWOMEN] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [categoryError, setCategoryError] = useState({
    error: false,
    helperText: "",
  });
  const [mainError, setmainError] = useState({
    error: false,
    helperText: "",
  });

  const [state, setState] = useState({
    snackbar: false,
    error: "",
    type: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const setMain = (e) => {
    setMainCategory(e.target.value);
  };

  const getData = async () => {
    setLoading(true);
    let MEN = [];
    let WOMEN = [];
    try {
      const res = await axios.get(ROUTES.GetAllCategories);
      const { categories } = res.data;
      console.log("categories", categories);

      categories.forEach((e) =>
        e.mainCategory === "MEN"
          ? MEN.push(e.name)
          : e.mainCategory === "WOMEN"
          ? WOMEN.push(e.name)
          : null
      );
      setLoading(false);
      setMEN(MEN);
      setWOMEN(WOMEN);
      setCategories(categories);
    } catch (error) {
      setLoading(false);
      setState({
        snackbar: true,
        error: "Failed to fetch data",
        type: "error",
      });
      console.log(error.response);
    }
  };

  const validate = () => {
    let cError;
    let mError;
    if (category.length < 3) {
      cError = {
        error: true,
        helperText: "Category Name must be of 3 characters",
      };
    } else
      cError = {
        error: false,
        helperText: "",
      };
    if (mainCategory === "") {
      mError = {
        error: true,
        helperText: "Please select Main Category",
      };
    } else
      mError = {
        error: false,
        helperText: "",
      };

    setCategoryError(cError);
    setmainError(mError);
    if (cError.error === false && mError.error === false) handleNew();
  };

  const handleDelete = (name) => {
    sweetAlert({
      title: "Are you sure want to delete ?",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
      closeOnClickOutside: false,
    }).then(async (yes) => {
      if (yes) {
        try {
          setLoading(true);
          const res = await axios.delete(ROUTES.DeleteCategory + name);
          console.log(res.data);
          setLoading(false);
          getData();
          setState({
            snackbar: true,
            error: res.data.msg,
            type: "success",
          });
        } catch (error) {
          setLoading(false);
          console.log(error.response);
          setState({
            snackbar: true,
            error: "Failed to delete category",
            type: "error",
          });
        }
      }
    });
  };

  const handleNew = async () => {
    try {
      setLoading(true);
      const res = await axios.post(ROUTES.AddNewCategory, {
        name: category,
        mainCategory,
      });
      console.log(res.data);
      setLoading(false);
      setState({
        snackbar: true,
        error: res.data.msg,
        type: "success",
      });
      setCategory("");
      setMainCategory("");
      getData();
    } catch (error) {
      setLoading(false);
      setState({
        snackbar: true,
        error: "Failed to add new category",
        type: "error",
      });
      console.log(error.response);
    }
  };

  return (
    <Container container>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress style={{ width: 60, height: 60 }} color="primary" />
      </Backdrop>
      <Snackbar
        style={{ marginLeft: 90 }}
        open={state.snackbar}
        autoHideDuration={2000}
        onClose={() => setState({ ...state, snackbar: false })}
      >
        <Alert
          onClose={() => setState({ ...state, snackbar: false })}
          severity={state.type}
        >
          {state.error}
        </Alert>
      </Snackbar>
      <Grid container spacing={2} alignItems="center" direction="row">
        <Grid item xs={12} sm={3}>
          <FormControl margin="dense" fullWidth variant="outlined">
            <InputLabel id="demo-simple">Main Category</InputLabel>
            <Select
              id="demo-simple"
              value={mainCategory}
              onChange={setMain}
              label={"Main Category"}
              error={mainError.error}
            >
              <MenuItem value={"WOMEN"}>WOMEN</MenuItem>
              <MenuItem value={"MEN"}>MEN</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            variant="outlined"
            onChange={(e) => setCategory(e.target.value)}
            margin="dense"
            type="text"
            value={category}
            maxLength={12}
            fullWidth
            error={categoryError.error}
            // helperText={categoryError.helperText}
            label="Sub Category"
            name="category"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button onClick={validate} variant="contained" color="primary">
            Add new Category
          </Button>
        </Grid>
      </Grid>
      {loading === false && MEN.length === 0 && WOMEN.length === 0 ? (
        <Typography variant="body1">No Categories found in Database</Typography>
      ) : null}
      <Grid container spacing={2} direction="row">
        <Grid item xs={12} sm={4}>
          {WOMEN.length > 0 ? (
            <Typography variant="h6" className={classes.Text}>
              WOMEN Categories
            </Typography>
          ) : null}
          <List className={classes.root}>
            {WOMEN.map((value, i) => {
              return (
                <ListItem style={{ marginBottom: 5 }} selected key={i}>
                  <ListItemText id={i} primary={`${i + 1}. ${value}`} />
                  <ListItemSecondaryAction>
                    <IconButton
                      style={{ color: "red" }}
                      onClick={() => handleDelete(value)}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={12} sm={4}>
          {MEN.length > 0 ? (
            <Typography variant="h6" className={classes.Text}>
              MEN Categories
            </Typography>
          ) : null}
          <List className={classes.root}>
            {MEN.map((value, i) => {
              return (
                <ListItem style={{ marginBottom: 5 }} selected key={i}>
                  <ListItemText id={i} primary={`${i + 1}. ${value}`} />
                  <ListItemSecondaryAction>
                    <IconButton
                      style={{ color: "red" }}
                      onClick={() => handleDelete(value)}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;
