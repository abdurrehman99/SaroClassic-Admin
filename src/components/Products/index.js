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
  TableFooter,
  CircularProgress,
  Avatar,
  MenuItem,
  Backdrop,
  IconButton,
  ButtonGroup,
  ButtonBase,
  Container,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import Add from "@material-ui/icons/Add";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { ROUTES } from "../../utils/routes";
import axios from "axios";

import {
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
  NavigateNextIcon,
} from "@material-ui/icons";

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
    borderRadius: 4,
    width: 38,
    height: 39,
  },
}));

const Index = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(ROUTES.GetAllProducts);
      console.log(res.data);
      const { products } = res.data;
      setLoading(false);
      setProducts(products);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Container>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress style={{ width: 60, height: 60 }} color="primary" />
      </Backdrop>
    </Container>
  );
};

export default Index;
