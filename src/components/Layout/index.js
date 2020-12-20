import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  MenuItem,
  Drawer,
  AppBar,
  Toolbar,
  Container,
  Typography,
  // Divider,
  CssBaseline,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  List,
  Collapse,
  IconButton,
} from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Logo from "../../assets/Logo.png";
import sweetAlert from "sweetalert";

import SettingsIcon from "@material-ui/icons/Settings";
import PeopleIcon from "@material-ui/icons/People";
import OrderIcon from "@material-ui/icons/Receipt";
import CategoryIcon from "@material-ui/icons/Category";
import ProductIcon from "@material-ui/icons/LocalMall";

import { logoutUser } from "../../redux/actions/authActions";

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#f0f2f5",
  },
  toolbar: {
    paddingLeft: 10,
    paddingRight: 45,
    height: 80,
  },
  nested: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 30,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  lineDiv: {
    borderLeft: "3px solid white",
    marginLeft: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  drawerOpen: {
    width: drawerWidth,
    background: theme.palette.primary.main,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    background: theme.palette.primary.main,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  content: {
    flexGrow: 1,
    paddingTop: 100,
    padding: theme.spacing(0),
  },
  navLogo: {
    height: 65,
    marginRight: "auto",
  },
  drawerIcon: {
    color: "white",
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 8,
  },
  toggleIcon: {
    marginLeft: 8,
    color: "white",
    marginTop: 10,
    marginRight: 0,
    marginBottom: 10,
  },
  textWhite: {
    color: "white",
    paddingTop: 110,
    fontSize: 10,
  },
  blackIcon: {
    color: "black",
    cursor: "pointer",
    // marginRight: 15,
  },
  menuIcon: {
    color: "black",
    fontSize: 22,
    cursor: "pointer",
    marginTop: 3,
  },
  listItemIcon: {},
  listItem: {
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 8,
  },
  avatar: {
    cursor: "pointer",
    marginLeft: 10,
  },
  icons: {
    color: "white",
  },
  lineDiv: {
    borderLeft: "3px solid white",
    marginLeft: 50,
    marginTop: 10,
    marginBottom: 10,
  },
}));

const Index = ({ children, logoutUser }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [product, setProduct] = useState(true);

  const toggleDrawer = () => {
    setOpen((prevState) => !prevState);
    setProduct(!product);
  };

  const logout = () => {
    sweetAlert({
      title: "Are you sure want to logout ?",
      icon: "warning",
      buttons: ["No", "Yes"],
      closeOnClickOutside: false,
    }).then((willDelete) => {
      if (willDelete) {
        logoutUser();
      }
    });
  };
  const handleProductClick = () => {
    setProduct(!product);
    if (!open) setOpen(true);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <MenuItem style={{ marginRight: "auto" }} component={Link} to={"/"}>
            <img src={Logo} alt="" className={classes.navLogo} />
          </MenuItem>
          <IconButton
            style={{ borderRadius: 5 }}
            onClick={logout}
            color="primary"
            component="span"
          >
            <Typography variant="body2">Logout </Typography>
            <ExitToAppIcon className={classes.menuIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <List className={classes.textWhite}>
          <MenuItem
            onClick={handleProductClick}
            className={classes.listItem}
            button
          >
            <ListItemIcon className={classes.listItemIcon}>
              <ProductIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary={"PRODUCTS"} />
          </MenuItem>

          <Collapse
            className={classes.lineDiv}
            in={product}
            timeout="auto"
            unmountOnExit
          >
            <List className={classes.submenu} component="div" disablePadding>
              <MenuItem
                component={Link}
                to={"/products-women"}
                button
                className={classes.nested}
              >
                <ListItemText primary="WOMEN" />
              </MenuItem>
              <MenuItem
                component={Link}
                to={"/products-men"}
                button
                className={classes.nested}
              >
                <ListItemText primary="MEN" />
              </MenuItem>
            </List>
          </Collapse>

          <MenuItem
            component={Link}
            to={"/categories"}
            className={classes.listItem}
            button
          >
            <ListItemIcon className={classes.listItemIcon}>
              <CategoryIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary={"CATEGORIES"} />
          </MenuItem>

          <MenuItem
            component={Link}
            to={"/orders"}
            className={classes.listItem}
            button
          >
            <ListItemIcon className={classes.listItemIcon}>
              <OrderIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary={"ORDERS"} />
          </MenuItem>

          <MenuItem
            component={Link}
            to={"/customers"}
            className={classes.listItem}
            button
          >
            <ListItemIcon className={classes.listItemIcon}>
              <PeopleIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary={"CUSTOMERS"} />
          </MenuItem>

          <MenuItem
            component={Link}
            to={"/settings"}
            className={classes.listItem}
            button
          >
            <ListItemIcon className={classes.listItemIcon}>
              <SettingsIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary={"SETTINGS"} />
          </MenuItem>
        </List>
        <ListItem style={{ marginTop: "auto" }} onClick={toggleDrawer} button>
          <ListItemIcon>
            {open ? (
              <ChevronLeftIcon className={classes.toggleIcon} />
            ) : (
              <ChevronRightIcon className={classes.toggleIcon} />
            )}
          </ListItemIcon>
        </ListItem>
      </Drawer>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { logoutUser })(Index);
