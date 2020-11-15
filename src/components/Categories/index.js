import React, { useState, useEffect } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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

import {
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
  DeleteOutline,
} from "@material-ui/icons";

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
  filterButton: {
    marginRight: 20,
    width: 133.4,
    height: 44.5,
    fontSize: "16px",
    fontWeight: "bold",
    textTransform: "none",
  },
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
  breadcrumbs: {
    paddingTop: 15,
    paddingBottom: 10,
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
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState({
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

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(ROUTES.GetAllCategories);
      console.log(res.data);
      const { categories } = res.data;
      setLoading(false);
      setCategories(categories);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  const handleDelete = async (name) => {
    try {
      setLoading(true);
      const res = await axios.delete(ROUTES.DeleteCategory + name);
      console.log(res.data);
      setLoading(false);
      let filteredCategory = categories.filter((e) => e.name !== name);
      setCategories(filteredCategory);
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
  };

  const handleNew = async () => {
    let cError = fieldValidate(category, "name");
    setCategoryError(cError);
    if (cError.error === false) {
      try {
        setLoading(true);
        const res = await axios.post(ROUTES.AddNewCategory, { name: category });
        console.log(res.data);
        setState({
          snackbar: true,
          error: res.data.msg,
          type: "success",
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setState({
          snackbar: true,
          error: "Failed to add new category",
          type: "error",
        });
        console.log(error.response);
      }
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
      <TextField
        variant="outlined"
        onChange={(e) => setCategory(e.target.value)}
        margin="dense"
        fullWidth
        type="text"
        maxLength={12}
        error={categoryError.error}
        helperText={categoryError.helperText}
        label="Enter New Category Name"
        name="category"
      />
      <Button onClick={handleNew} variant="contained" color="primary">
        Add new Category
      </Button>
      <Grid item xs={6}>
        <List className={classes.root}>
          {categories.map((value, index) => {
            return (
              <ListItem key={index} dense>
                <ListItemText id={index} primary={value.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    style={{ color: "red" }}
                    onClick={() => handleDelete(value.name)}
                  >
                    <DeleteOutline />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Container>
  );
};

export default Index;
